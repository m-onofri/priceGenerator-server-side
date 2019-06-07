var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var priceListRouter = require('./routes/priceList');
var testAPIRouter = require('./routes/testAPI');

// DB Config
const db = 'mongodb+srv://m-ono_83:3mt8w58l2118hnjJ@cluster0-3cnvm.mongodb.net/price-generator';

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/priceList', priceListRouter);
app.use('/testAPI', testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
