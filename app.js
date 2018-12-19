const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const bodyParser = require('body-parser');
const router = express.Router();
//mongoose.connect('mongodb://localhost/')
mongoose.connect('mongodb://samiksha:samiksha123@ds243441.mlab.com:43441/devconnector');
let db = mongoose.connection;

db.once('open', function () {
    console.log('connected to mongodb');
});

db.on('error', function (err) {
    console.log(err);
});

//init app 
const app = express();

// ejs layout
var expressLayouts = require('express-ejs-layouts');

console.log("kjkjkjjk", __dirname)

let Article = require('./models/articles');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//set public folder
console.log('path.join(__dirname, ) :', path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));




//home route

app.get('/', function (req, res) {
    console.log("inside")
    Article.find({}, function (err, articles) {
        if (err) {
            console.log("Mongo Error ", err);
        } else {
            console.log("woking", articles)
            res.render('index', {
                title: 'articles',
                articles: articles




            });
        }
    });
});

app.get('/abc', function (req, res) {
    console.log('error');
    res.render('pages/form', {
        title: 'articles',
        articles: [{

            id: 1,
            title: 'Article one ',
            auther: 'xyz',
            body: 'this is article one'

        }]


    });

});
app.post('/api/data', function (req, res) {
    // let article = new Article();
    // article.title = req.body.title;
    // article.author = req.body.auther;
    // //article.body = req.body.body;
    // article.save(function (err) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     } else {
    //         res.redirect('/');
    //     }
    // });
    console.log('submitted', req.body);
    // return;
    let payload = {
        title: req.body.Title || '',
        auther: req.body.Auther || '',
        body: req.body.body || 'vvv'
    }
    Article.create(payload, function (err, articles) {
        // if (err) {
        console.log("Mongo Error ", err);
        res.json({ status: false, message: "try agin" })

        // } else {
        // console.log("woking", articles)
        // res.json({
        // title: 'articles',
        // articles: articles


        // });
        // }
    });
});



app.get('/article', function (req, res) {
    // let articles = [
    //     {
    //         id: 1,
    //         title: 'Article one ',
    //         auther: 'xyz',
    //         body: 'this is article one'
    //     },

    //     {
    //         id: 1,
    //         title: 'Article one',
    //         auther: 'xyz',
    //         body: 'this is article one'
    //     }

    // ]
    Article.create({
        title: 'Article one ' + uuidv4(),
        auther: 'xyz',
        body: 'this is article one'

    },
        function (err, records) {
            let data = {};
            data.articles = [records]
            // console.log("Record added as " + records);
            // res.render('index', {
            //     title: 'Articles',
            //     articles: articles
            // });
        });
    console.log("display data")
});
app.get('/about', function (req, res) {
    res.render('pages/about', {
        title: 'Articles'

    });
});
//add route
app.get('/articles/add', function (req, res) {
    res.render('add_article', {
        title: 'Add Article'
    });
});

//start server
app.listen(3000, (req, res) => {
    console.log('Name :', "World");
    console.log('Server Sarted on port 3000 ');
});