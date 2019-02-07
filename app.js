const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.all('/', router);
app.post('/index', router);

app.all('/*', (req, res, next) => {    
    //TODO is this correct error??
    next({status: 400, message: 'Server understood request but refused to fulfil it'});
})

app.use((err, req, res, next) => {
    res.status(err.status).send(err); 
    //TODO render error??
});

module.exports = app;