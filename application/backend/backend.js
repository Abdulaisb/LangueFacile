//Setup
import express from "express";
import { PORT, mongodbURL } from "./config.js";
import {mongoose} from "mongoose";
import cors from 'cors'

const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
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
//User Model
const User = mongoose.model('User', {
    username: String,
    name: String,
    password: String,
    highlighting: [String]
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
//Gets random article
app.get('/random_article', async(req,res) => {
    console.log('Random Function')
    try {
        let cnt = await Article.countDocuments();
        let rand = Math.floor(Math.random()*cnt);
        const article = await Article.findOne().skip(rand).exec();
        res.json(article);
    }
    catch(err) {
        console.error(err)
    }
});
//Handles Sign up
app.put('/signup', async(req,res) => {
    const {name, user, password} = req.body;
    if (await User.findOne({'username': user}).exec() !== null) {
        console.log('User already exists');
        res.json('duplicate');
    }
    else if (name === '' || user == '' || password == '') {
        res.json('invalid');
    }
    else {
        const input = new User({
            username : user,
            name : name,
            password : password,
            highlighting : []
        });
        input.save();
        res.json('good');
    }    
});
//Handles Log In
app.put('/login', async(req,res) => {
    const {user, password} = req.body;
    if (user === "" || password === "") {
        res.json('invalid');
    }
    else {
        const userData = await User.findOne({'username': user}).exec();
        if (userData === null) {
            res.json('not found');
        }
        else if (userData.password !== password) {
            res.json('invalid password');
        }
        else {
            res.json(userData);
        }    
    }    
});
