var express = require('express');
var bodyParser = require('body-parser');

var User = require('../models/User');
var Article = require('../models/Article');

var crypto = require('crypto');

var blogRouter = express.Router();
blogRouter.use(bodyParser.json());

/*
    The steps followed to save the article in the database

    1. Insert the article in articles table
    2. Get the article id and insert it into the users's wrtten articles array
    3. Insert the article id into the choices tables that the author has selected for it
       
*/

async function publishNewArticle(body) {
    return new Promise((resolve) => {
        const { userId, articleTitle, articleBody, articleTags } = body;

        const blogId = crypto.randomBytes(10).toString('hex');

        Article.create({
            id: blogId,
            title: articleTitle,
            body: articleBody,
            createdBy: userId,
            createdAt: new Date(),
            updateAt: new Date()
        });

        resolve(blogId);
    });

}

async function addArticleToUser(userId, blogId) {
    return new Promise((resolve) => {
        const user = User.findOne({
            where: {
                id: userId
            }
        });

        resolve(user);
    })
}

blogRouter.route('/new')
    .post((req, res, next) => {
        //Here is the enpoint to publish a new article
        publishNewArticle(req.body)
            .then((blogId) => addArticleToUser(req.body.userId, blogId))
            .then((user) => console.log(user))
            .catch((error) => console.error(error));
    })

module.exports = blogRouter;