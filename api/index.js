'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const welcome = require('./routes/welcome');
const meals = require('./routes/meals');
const orders = require('./routes/orders');
const app = express();

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
    // mongoose.connect(conn, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // console.log('Conetado a Mongoose =', process.env.MONGODB_URI)
}).catch((err) => {
    console.log('Error en la conexion a MongoDB', err);
    process.exit(-1)
})

//midllewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use(cors());
// app.options('*', cors()); 
// Add headers
app.use('/', function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//añadimos las rutas
app.use('/api/', welcome);
app.use('/api/meals', meals);
app.use('/api/orders', orders);
// app.use('/api/(.*)', index);


module.exports = app;
