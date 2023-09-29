# Sreality

Sreality is an implementation, that scrapes the first 500 flats for sale from the website https://www.sreality.cz/en, saves them in the database, and shows them on the webpage using pagination. The project's root contains the following components:
* `./api` - The API is developed entirely in TypeScript. It initializes a PostgreSQL database and uses parallel scraping to efficiently scrape and save the first 500 flats for sale from https://www.sreality.cz/en. Of course, as API it also has endpoints, which allow us to interact with the data from the database.
* `./app` - The application is developed in React and TypeScript. It gets and shows with pagination the flats stored in the database by interacting with the API. 
* `app.ts` - The server is developed in TypeScript using NodeJS and Express. It starts both the application and the API on the same address, but with the difference that the endpoints of the API are in the route `/api` and the webpage is in the main route `/`.


## Running
You can run the application with Docker by running the following command on the command line and in the root folder of the project:
```
docker-compose up
```
After the server is up and running the application can be accessed on the link http://127.0.0.1:8080. Take into consideration that it may take a few seconds for the whole data to be scraped from the webpage and saved into our database.


## Authors
* Nikolay Vasilev
