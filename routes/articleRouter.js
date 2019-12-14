var express = require('express');
var bodyParser = require('body-parser');

var blogRouter = express.Router();
blogRouter.use(bodyParser.json());

blogRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.json({ endpoint: 'article', method: 'get'});
    })
    .post((req, res, next) => {
        
    })

module.exports = blogRouter;