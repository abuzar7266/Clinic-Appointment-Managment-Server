var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var addProduct = require('./routes/AddProductRouter');
var updateProduct = require('./routes/UpdateProductRouter');
var mongoose = require('mongoose');


const MongoDbStore = require('connect-mongo');

var app = express();


const dbString = 'mongodb+srv://rentSystem:rentSystem@cluster0.wtdg1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority###123';
mongoose.connect(dbString,{
    autoIndex: false
})
    .then(()=>console.log("DB server connect"))
    .catch(e => console.log("DB error", e));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
      secret: 'ahsdjhasdhagsjdgajsdgjhagsdjhgasdhgajhsgdjhagsdhgasd',
      resave: false,
      saveUninitialized: false,
      store: MongoDbStore.create({
          mongoUrl: dbString
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
  })
);

app.use('/addProduct',addProduct);
app.use('/updateProduct',updateProduct);
//----------------------
//Deploy Routers here
//----------------------

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
