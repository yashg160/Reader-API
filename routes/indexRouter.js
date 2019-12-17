var express = require('express');
var bodyParser = require('body-parser');

var indexRouter = express.Router();
indexRouter.use(bodyParser.json());

indexRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.send('Congratulations. Server is running!');
    });

module.exports = indexRouter;