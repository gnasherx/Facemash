import express from "express";
import constants from "./configuration/constants";
import "./configuration/database";
import middlewaresConfig from './configuration/middlewares';
import cors from 'cors';
import {UserRoutes} from "./models";

const app = express();
middlewaresConfig(app);
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE, GET');
        return res.status(200).json({
            message: 'Cors resolve'
        });
    }
    next();
});

app.use('/api', UserRoutes);

app.listen(constants.PORT, err => {
    if (err)
        throw err;
    else {
        console.log(`
       Server running on port: ${constants.PORT}
       ---
       Running on ${process.env.NODE_ENV}
       `);
    }
});