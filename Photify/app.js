var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));   // for body parser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));    // to service static files.

// Session
app.use(session({
    secret: 'photify',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60 * 1000 * 30,
        httpOnly: false,
    }
}));

// Routers
app.use('/', indexRouter);

// Errors: 404 - Page not found
app.use((req, res, next) => {
    var err = new Error("Page not found.");
    err.status = 404;
    next(err);
});

// handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
})

module.exports = app;
