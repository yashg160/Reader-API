var express = require('express');
var bodyParser = require('body-parser');

var blogRouter = express.Router();
blogRouter.use(bodyParser.json());

blogRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.json({ name: 'Yash Gupta', age: 20 });
    });

module.exports = blogRouter;