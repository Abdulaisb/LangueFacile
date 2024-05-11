//Setup
import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
const app = express();

//Communication


//Listening
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
})

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App connected to database')
    })
    .catch((error) => {
        console.log(error)
    })