var createError = require('http-errors');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var session = require('express-session');
var cors = require('cors');

const indexRouter = require('./routes/indexRouter');
const usersRouter = require('./routes/usersRouter');
const blogRouter = require('./routes/blogRouter');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Routes defined
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);



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