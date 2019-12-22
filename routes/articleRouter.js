var express = require('express');
var bodyParser = require('body-parser');

var User = require('../models/User');
var Article = require('../models/Article');
var Tags = require('../models/Tags');

var Sequelize = require('sequelize');

var crypto = require('crypto');

var articleRouter = express.Router();
articleRouter.use(bodyParser.json());

/*
    The steps followed to save the article in the database

    1. Insert the article in articles table
    2. Get the article id and insert it into the users's wrtten articles array
    3. Insert the article id into the choices tables that the author has selected for it
       
*/

async function publishNewArticle(body) {
    const { userId, articleTitle, articleBody, articleTags } = body;

    const articleId = crypto.randomBytes(10).toString('hex');

    //Create the article in the articles table in database
    await Article.create({
        id: articleId,
        title: articleTitle,
        body: articleBody,
        createdBy: userId,
        createdAt: new Date(),
        updateAt: new Date()
    });

    // Now check for each tag in the array from the front end
    // Insert the article id into the table that matches the tag.

    await articleTags.map(async (tag, index)  => {
        console.log(tag, index);
        switch (tag) {
            case 'entertainment':
                await Tags.Entertainment.create({
                    articleId: articleId
                });
                break;
            case 'faishon':
                await Tags.Faishon.create({
                    articleId: articleId
                });
                break;
            case 'fitness':
                await Tags.Fitness.create({
                    articleId: articleId
                });
                break;
            case 'finance':
                await Tags.Finance.create({
                    articleId: articleId
                });
                break;
            case 'relationship':
                await Tags.Relationship.create({
                    articleId: articleId
                });
                break;
            case 'technology':
                await Tags.Technology.create({
                    articleId: articleId
                });
                break;
            default:
                console.log(tag, index);
        }
    })

    return articleId;
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

    //TODO: Check for any errors
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
    //TODO: Check for any errors
    author = author.dataValues;

    return {author, article}
}

async function getUserChoices(userId) {

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    return user.dataValues.choices;
}

async function getRandomArticleIds(tags) {

    let articleIds = {};

    for (i = 0; i < tags.length; i++){

        let ids = [];
        let articles = null;

        let tag = tags[i];

        switch (tag) {
            case 'entertainment':

                articles = await Tags.Entertainment.findAll({ order: Sequelize.literal('rand()'), limit: 5 });

                articles.forEach(async (article, i) => {
                    await ids.push(article.dataValues.articleId);
                });

                articleIds.Entertainment = ids;

                break;

            case 'faishon':

                articles = await Tags.Faishon.findAll({ order: Sequelize.literal('rand()'), limit: 5 });

                articles.forEach(async (article, i) => {
                    await ids.push(article.dataValues.articleId);
                });

                articleIds.Faishon = ids;

                break;

            case 'finance':
                ids = [];

                articles = await Tags.Finance.findAll({ order: Sequelize.literal('rand()'), limit: 5 });

                articles.forEach(async (article, i) => {
                    await ids.push(article.dataValues.articleId);
                });

                articleIds.Finance = ids;

                break;

            case 'fitness':
                ids = [];

                articles = await Tags.Fitness.findAll({ order: Sequelize.literal('rand()'), limit: 5 });

                articles.forEach(async (article, i) => {
                    await ids.push(article.dataValues.articleId);
                });

                articleIds.Fitness = ids;

                break;

            case 'relationship':
                ids = [];

                articles = await Tags.Relationship.findAll({ order: Sequelize.literal('rand()'), limit: 5 });

                articles.forEach(async (article, i) => {
                    await ids.push(article.dataValues.articleId);
                });

                articleIds.Relationship = ids;

                break;

            case 'technology':
                ids = [];

                articles = await Tags.Technology.findAll({ order: Sequelize.literal('rand()'), limit: 5 });

                articles.forEach(async (article, i) => {
                    await ids.push(article.dataValues.articleId);
                });

                articleIds.Technology = ids;

                break;

            default:
                console.log(`${tag} did not match any values`);
        }
    }

    return articleIds;
    
}

async function getArticles(articleIds, userId, callback) {
    
    let articles = {};

    for (var tag in articleIds) {
        console.log(tag);

        articles[tag] = [];

        const ids = articleIds[tag];

        for (i = 0; i < ids.length; i++) {

            const articleId = ids[i];

            const article = await Article.findOne({
                where: {
                    id: articleId
                }
            });

            if (article) {
                const content = article.dataValues;
                const createdBy = content.createdBy;

                if (content.createdBy != userId) {

                    let authorData = await User.findOne({
                        attributes: ['firstName', 'lastName', 'avatar'],
                        where: {
                            id: createdBy
                        }
                    });

                    const author = await authorData.dataValues;

                    content.author = await author;

                    articles[tag].push(content);
                    console.log(articles);
                }
            }
        }
    }

    callback(articles);
}

articleRouter.route('/')
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

articleRouter.route('/new')
    
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
    });





articleRouter.route('/forUser')
    .get((req, res, next) => {
    
        const userId = req.query.id;
        console.log(userId);

        getUserChoices(userId)
            .then((tags) => getRandomArticleIds(tags))
            .then((articleIds) => {
                getArticles(articleIds, userId, articles => {
                    res.send(articles);
                });
                //console.log(`Article ids: ${articleIds}`);
               
            })
            .catch(error => console.error(error));
    });


module.exports = articleRouter;