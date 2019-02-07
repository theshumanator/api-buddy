const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
//const apiRouter = require('./routes/api-router');

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    
    res.render('index', {isResponse: false});
});

app.get('/index', (req, res, next) => {    
    res.render('index', {
        /* 
            TODO make ejs not pass json in query, instead in obj or body
            TODO get the json received from the api 
            TODO handle the API post, get, put and delete     
        */
        jsonRcvd: JSON.stringify({msg: 'Hello'}),
        isResponse: true,
        res: res});
        
});

app.all('/*', (req, res, next) => {
    
    next({status: 400, message: 'Server understood request but refused to fulfil it'});
})

app.use((err, req, res, next) => {
    if (err.status===404) {
        res.status(404).json({message: err.message});
    } else if (err.status===400) {
        res.status(400).json({message: err.message});
    } else {
        res.status(500).send(err.message);
    }    
});

module.exports = app;