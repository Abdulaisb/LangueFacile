//Setup
import express from "express";
import { PORT, mongodbURL } from "./config.js";
import {mongoose, Schema} from "mongoose";
import cors from 'cors'

const app = express();
app.use(cors());

//Listening
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
})
//Database Conenction
mongoose
    .connect(mongodbURL, {dbName: 'langDB'})
    .then(() => {
        console.log('App connected to database')
    })
    .catch((error) => {
        console.log(error)
    });
//Article Model
const Article = mongoose.model('Article', {
    title: String,
    lang1: String,
    lang2: String,
    text1: [String],
    text2: [String],
    link: String
});
//API connection verification
app.get('/connect', async(req, res) =>
{
    console.log('Connect Function')
    const msg = {'message':'Backend Connected'};
    res.json(msg);
});
//Gets first article in database
app.get('/article', async(req,res) => {
    console.log('Article Function')
    try {
        const article = await Article.findOne({}).exec();
        res.json(article);
    }
    catch(err) {
        console.error(err)
    }
});