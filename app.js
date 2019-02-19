const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');
const expressValidator = require('express-validator')


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressValidator())

app.all('/', router);
app.post('/index', router);

app.all('/*', (req, res, next) => {       
    next({status: 400, message: 'Server understood request but refused to fulfil it'});
})

app.use((err, req, res, next) => {
    const renderedObj = {
        jsonRcvd: err,
        isResponse: true
    }   
    res.render('index', renderedObj);      
});

module.exports = app;