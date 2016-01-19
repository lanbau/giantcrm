var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var routes = require('./routes/index')
var calendar = require('./routes/calendar')
var contacts = require('./routes/contacts')
var gmail = require('./routes/gmail')
var reviews = require('./routes/reviews')
var push = require('./routes/push')
var notes = require('./routes/notes')
var concepts = require('./routes/concepts')

var app = express()
var jwt = require('express-jwt')

var jwtCheck = jwt({
  secret: new Buffer('L7ctAGkBFBX29RhsdXixp62Lkpo8B1y9YMLwA-ymBVYNjSVcQtk_VM9RR7C-RG8g', 'base64'),
  audience: 'keY7skILu0DeJk9ZXNB1Kbkeln9wBZsj'
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/calendar', calendar)
app.use('/contacts', contacts)
app.use('/gmail', gmail)
app.use('/reviews', reviews)
app.use('/push', push)
app.use('/notes', notes)
app.use('/concepts', concepts)

app.use('/calendar', jwtCheck)
app.use('/contacts', jwtCheck)
app.use('/gmail', jwtCheck)
app.use('/reviews', jwtCheck)
app.use('/push', jwtCheck)
app.use('/notes', jwtCheck)
app.use('/concepts', jwtCheck)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
