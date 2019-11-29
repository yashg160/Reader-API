var express = require('express');
var bodyParser = require('body-parser');

var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

usersRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.json({ name: 'Yash Gupta', age: 20 });
    });

module.exports = usersRouter;