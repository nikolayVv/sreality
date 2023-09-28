import { Sequelize } from 'sequelize';
import FlatsService from "../services/flat.service";
import setupModels, { FlatAttributes } from "../models/models";
import { Cluster } from "puppeteer-cluster";

import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const webScrapeUrl = "https://www.sreality.cz/en/search/flats/for-sale";
const service = new FlatsService();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;
const dbPort = process.env.DB_PORT as unknown as number;

const sequelize: Sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        host: dbHost,
        port: dbPort,
        dialect: 'postgres'
    }
);

// Start the web scraping for all 500 flaps on the webpage
// Save each set of flats received from each page of the website
const startWebScraping = async () => {
    console.log(`Starting web scraping from ${webScrapeUrl}`);
    const pages = 25;
    let total = 0;

    const cluster: Cluster<string, void> = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 5,
        puppeteerOptions: {
            headless: "new",
            args: ['--enable-gpu', '--no-sandbox'],
        }
    });

    await cluster.task(async ({ page, data: url }) => {
        try {
            const flatsData: FlatAttributes[] = [];
            await page.goto(url);

            // Wait for the elements with the class property to load
            await page.waitForSelector("div.property.ng-scope");

            // Get the HTML content after that
            const HTMLData = await page.content();

            const $ = cheerio.load(HTMLData);
            const flats = $("div.property.ng-scope");
            flats.each((i, flat) => {
                const imageUrls: string[] = [];

                // Get all the <img> tags for the current flat and extract the value of "src"
                $(flat).find("img").each((j, img) => {
                    const src = $(img).attr("src");
                    if (src && (src.indexOf("http://") == 0 || src.indexOf("https://") == 0)) {
                        imageUrls.push(src);
                    }
                })

                const title = $(flat).find("span.name.ng-binding").text().trim();
                const location = $(flat).find("span.locality.ng-binding").text().trim();
                const price = $(flat).find("span.norm-price.ng-binding").text().trim();

                const tags: string[] = [];
                $(flat).find("span.label.ng-binding.ng-scope").each((j, label) => {
                    const tag = $(label).text().trim();
                    if (tag) {
                        tags.push(tag);
                    }
                });

                const flatData: FlatAttributes = {
                    title: title,
                    location: location,
                    price: price,
                    tags: tags,
                    imageUrls: imageUrls,
                }

                flatsData.push(flatData);
            });

            const data = await service.saveBatch(flatsData);
            console.log(`${data.length} flats were successfully scraped and saved into the database!`);
        } catch (e) {
            console.error(`Error while processing: ${url}`, e);
        }
    });

    for (let page=1; page <= pages; page++) {
        let url = webScrapeUrl;
        if (page != 1) {
            url += `?page=${page}`;
        }

        await cluster.queue(url);
    }

    await cluster.idle();
    await cluster.close();
};

// Connect with the database, drop the old flats table if existing and create a new empty one
// Start the web scraping and saving of the 500 flats from the webpage in the database
sequelize.sync({ force: true }).then(async () => {
    console.log("PostgreSQL Connection has been established successfully!");
    await startWebScraping();
}).catch((e: Error) => {
    console.log("Unable to connect to the PostgreSQL database!", e);
});

setupModels(sequelize);

export default sequelize;

