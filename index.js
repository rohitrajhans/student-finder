const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// connecting to mongodb
mongoose.connect('mongodb://localhost/school');
mongoose.Promise = global.Promise;

//To serve statisc files from public folder
app.use(express.static('public'));

app.use(bodyParser.json());

//to initialize routes
app.use('/api',routes);

// error handling middleware

app.use( function (err,req,res,next) {
    //console.log(err);
    res.status(422).send({error: err.message});
});

//listen for requests
app.listen( process.env.port || 4000, () => console.log('Listening for requests'));