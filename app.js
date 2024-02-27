require('dotenv').config();

require('./models/connection');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var walksRouter = require('./routes/walks');
var breedsRouter = require("./routes/breeds");
var dogsRouter = require("./routes/dogs");
var traitsRouter = require('./routes/traits');

var app = express();
// CP : gestion des uploads de fichiers photos
const fileUpload = require("express-fileupload");
app.use(fileUpload());


const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/walks', walksRouter);
app.use("/dogs", dogsRouter);
app.use("/breeds", breedsRouter);
app.use("/traits", traitsRouter);

module.exports = app;
