var express = require('express');
var bodyParser = require('body-parser');

var indexRouter = express.Router();
indexRouter.use(bodyParser.json());

indexRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.json({ name: 'Yash Gupta', age: 20 });
    });

module.exports = indexRouter;