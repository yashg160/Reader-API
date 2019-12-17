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
    const { userId, articleTitle, articleBody, articleTags } = body;

    const blogId = crypto.randomBytes(10).toString('hex');

    await Article.create({
        id: blogId,
        title: articleTitle,
        body: articleBody,
        createdBy: userId,
        createdAt: new Date(),
        updateAt: new Date()
    });

    return blogId;
}

async function insertArticleIntoUser(userId, newBlogId) {
    
    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    const writtenBlogs = await user.dataValues.writtenBlogs;
    let newWrittenBlogs = [];
    
    if (writtenBlogs == null) {
        newWrittenBlogs.push(newBlogId);
    }
    else {
        newWrittenBlogs = await writtenBlogs.slice();
        newWrittenBlogs.push(newBlogId);
    }

    await User.update({
        writtenBlogs: newWrittenBlogs
    }, {
        where: {
            id: userId
        }
    });

    return newBlogId;
}

async function getArticleById(blogId) {

    let article = await Article.findOne({
        where: {
            id: blogId
        }
    });

    article = article.dataValues;

    return article;
}

async function getArticleAuthor(article) {
    const userId = article.createdBy;

    let author = await User.findOne({
        where: {
            id: userId
        }
    })

    author = author.dataValues;

    return {author, article}
}

blogRouter.route('/')
    .get((req, res, next) => {
    
        const blogId = req.query.blogId;
        console.log(blogId);

        getArticleById(blogId)
            .then((article) => getArticleAuthor(article))
            .then((response) => {

                console.log(response);
                const { author, article } = response;
                
                //Prepare the response to be sent
                res.status(200).send({
                    error: false,
                    errorMessage: 'ERR_NONE',
                    articleTitle: response.article.title,
                    articleBody: article.body,
                    articleReads: article.nReads,
                    articleLikes: article.nLikes,
                    authorName: `${author.firstName} ${author.lastName}`,
                    authorAbout: author.about,
                    authorAvatar: author.avatar
                });
                    
            })
            .catch(error => {
                console.error(error);
                res.status(200).send({ error: true, errorMessage: 'ERR_SOME', blogId: blogId });
            });
})

blogRouter.route('/new')
    .post((req, res, next) => {
        //Here is the enpoint to publish a new article

        publishNewArticle(req.body)
            .then((blogId) => insertArticleIntoUser(req.body.userId, blogId))
            .then((newBlogId, userId) => {
                res.status(200).send({ error: false, errorMessage: 'ERR_NONE', newBlogId: newBlogId });
            })
            .catch((error) => {
                console.error(error);
                res.status(200).send({ error: true, errorMessage: 'ERR_SOME' });
                //TODO: Handle different error conditions
            });
    })

module.exports = blogRouter;