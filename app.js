var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var session = require('express-session');
var cors = require('cors');
var passpport = require('passport');
var cookieParser = require('cookie-parser');


const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const articleRouter = require('./routes/articleRouter');


var app = express();

/* app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); */


//app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(cookieParser());


app.use(passpport.initialize());

//Routes defined
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);



//If no route matches, then display a 404 not found error.
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
/* app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({ error: true });
}); */

module.exports = app;