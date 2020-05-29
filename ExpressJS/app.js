var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var hranaRouter = require('./routes/hrana');
var receptRouter = require('./routes/Recept');
var kategorijaReceptaRouter = require('./routes/Kategorija_recepta');
var uporabnikRouter = require('./routes/uporabnik')
var rezultatiRouter = require('./routes/rezultati')
var uporabniskiRacunRouter = require('./routes/uporabniskiRacun');
var treningRouter = require('./routes/trening');
var vajaRouter = require('./routes/vaja');
var misicnaSkupinaRouter = require('./routes/misicnaSkupina');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('json spaces', 4);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hrana', hranaRouter);
app.use('/Recept', receptRouter);
app.use('/Kategorija_recepta', kategorijaReceptaRouter);
app.use('/uporabnik', uporabnikRouter);
app.use('/rezultati', rezultatiRouter);
app.use('/uporabniskiRacun', uporabniskiRacunRouter);
app.use('/trening', treningRouter);
app.use('/vaja', vajaRouter);
app.use('/misicnaSkupina', misicnaSkupinaRouter);

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
