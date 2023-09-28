import http from 'http';
import express, { Express } from "express";
import morgan from "morgan";
import routerApi from "./api/routes";
import createError from 'http-errors';
import dotenv from 'dotenv';
import path from 'path';
import './api/config/db';

dotenv.config();
const app: Express = express();

// Logging
app.use(morgan('dev'));

// Parse the request and JSON data
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, 'app', 'build')));

// Rules of API
app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// Routes of API
app.use('/api', routerApi);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "app", "build", "index.html"));
})


// Run the server
const httpServer = http.createServer(app);
const port = process.env.PORT ?? 8080;
app.set('port', port);

httpServer.listen(port, () => {
   console.log(`The server is running on port ${port}`);
});

// Error handling
app.use((req, res, next) => {
    next(createError(404));
})


export default app;