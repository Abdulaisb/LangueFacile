import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(process.env.PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`)
})
mongoose
    .connect(process.env.MONGODBURL, {dbName: 'langDB'})
    .then(() => {
        console.log('App connected to database')
    })
    .catch((error) => {
        console.log(error)
    });
//Models
const ObjectId = mongoose.Types.ObjectId;
const Article = mongoose.model('Article', {
    title: String,
    lang1: String,
    lang2: String,
    text1: [String],
    text2: [String],
    link: String
});
const User = mongoose.model('User', {
    username: String,
    name: String,
    password: String,
    highlighting: [{id:String, lit:[Number]}]
});
//Article Queries
app.get('/article', async(req,res) => {
    try {
        const article = await Article.findOne({}).exec();
        res.json(article);
    }
    catch(err) {
        console.error(err)
    }
});
app.post('/random_article', async(req,res) => {
    try {
        let cnt = await Article.countDocuments();
        let rand = Math.floor(Math.random()*cnt);
        const article = await Article.findOne().skip(rand).exec();
        const {username} = req.body;
        const user = await User.findOne({username:username}).exec();
        let lighting = [];
        for (const art of user.highlighting) {
            if (((new ObjectId(art.id))).equals(article._id)) {
                lighting = art.lit;
                break;
            } 
        }
        res.json({article: article, lit : lighting});
    }
    catch(err) {
        console.error(err)
    }
});
app.post('/set_article', async(req,res) => {
    const {articleID, username} = req.body;
    const article = await Article.findById(articleID).exec();
    const user = await User.findOne({username:username}).exec();
    let lighting = [];
    for (const art of user.highlighting) {
        if (((new ObjectId(art.id))).equals(article._id)) {
            lighting = art.lit;
            break;
        } 
    }
    res.json({article: article, lit : lighting});
});
//Authentication
app.post('/signup', async(req,res) => {
    console.log('sign up');
    const {name, user, password} = req.body;
    if (await User.findOne({'username': user}).exec() !== null) {
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
        res.json(input);
    }    
});
app.post('/login', async(req,res) => {
    console.log('log in');
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
//User's shelf
app.post('/save_article', async(req,res) => {
    const {username, articleID, lit} = req.body;
    let user = await User.findOne({username : username}).exec();
    let found = false;
    for (let art of user.highlighting) {
        if (art.id === articleID) {
            //article found
            found = true;
            art.lit = lit;
            break;
        }
    }
    if (!found) {
        await user.highlighting.push({id:articleID, lit: lit});
    }
    await user.save();
    res.json('article saved')
});
app.post('/unsave_article', async(req,res) => {
    const {username, articleID} = req.body;
    let user = await User.findOne({username : username}).exec();
    user.highlighting = user.highlighting.filter(item => item.id !== articleID);
    await user.save();
    res.json('article unsaved')
});
app.post('/delete_article', async(req,res) => {
    const {username, articleID, lit} = req.body;
    let user = await User.findOne({username : username}).exec();
    //TODO
});
app.post('/saved_articles', async(req,res) => {
    const {username} = req.body;
    const user = await User.findOne({username : username}).exec();
    let payload = [];
    for (const art of user.highlighting) {
        const articleDoc = await Article.findById(art.id).exec();
        payload.push({
            title: articleDoc.title,
            id: art.id
        });
    }
    res.json(payload);
});
