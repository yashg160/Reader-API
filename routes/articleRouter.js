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
    const { userId, articleTitle, articleBody, articleTags, articleImage } = body;

    const articleId = crypto.randomBytes(10).toString('hex');

    //Create the article in the articles table in database
    await Article.create({
        id: articleId,
        title: articleTitle,
        body: articleBody,
        image: articleImage,
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

async function getArticleById(articleId) {

    let article = await Article.findOne({
        where: {
            id: articleId
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

async function getRandomArticleIds() {

    let articleIds = {

        Entertainment: [],
        Faishon: [],
        Finance: [],
        Fitness: [],
        Relationship: [],
        Technology: []
    };

    // Get articles for each individual category

    // Entertainment
    let ids = await Tags.Entertainment.findAll({ order: Sequelize.literal('rand()'), limit: 10 });
    
    for (i = 0; i < ids.length; i++){
        await articleIds['Entertainment'].push(ids[i].dataValues.articleId);
        console.log(ids[i].dataValues.articleId);
    }

    // Finance
    ids = await Tags.Finance.findAll({ order: Sequelize.literal('rand()'), limit: 10 });

    for (i = 0; i < ids.length; i++) {
        await articleIds['Finance'].push(ids[i].dataValues.articleId);
    }

    // Fitness
    ids = await Tags.Fitness.findAll({ order: Sequelize.literal('rand()'), limit: 10 });

    for (i = 0; i < ids.length; i++) {
        await articleIds['Fitness'].push(ids[i].dataValues.articleId);
    }

    // Faishon
    ids = await Tags.Faishon.findAll({ order: Sequelize.literal('rand()'), limit: 10 });

    for (i = 0; i < ids.length; i++) {
        await articleIds['Faishon'].push(ids[i].dataValues.articleId);
    }

    // Relationship
    ids = await Tags.Relationship.findAll({ order: Sequelize.literal('rand()'), limit: 10 });

    for (i = 0; i < ids.length; i++) {
        await articleIds['Relationship'].push(ids[i].dataValues.articleId);
    }

    // Technology
    ids = await Tags.Technology.findAll({ order: Sequelize.literal('rand()'), limit: 10 });

    for (i = 0; i < ids.length; i++) {
        await articleIds['Technology'].push(ids[i].dataValues.articleId);
    }

    return articleIds;
    
}

async function getArticles(articleIds, userId) {
    console.log('getArticles function \n');

    let articles = {
        'Entertainment': [],
        'Finance': [],
        'Fitness': [],
        'Faishon': [],
        'Relationship': [],
        'Technology': []
    };

    const tags = Object.keys(articleIds);

    //Get the articles for each category 

    for (j = 0; j < tags.length; j++){
        const tag = tags[j];
        console.log(tag+'\n');

        let ids = articleIds[tag];

        for (i = 0; i < ids.length; i++) {
            const id = ids[i];
            let article = await Article.findOne({
                where: {
                    id: id
                }
            });

            if (article) {
                let content = article.dataValues;

                const createdBy = content.createdBy;

                if (content.createdBy != userId) {

                    let rawAuthor = await User.findOne({
                        attributes: ['id', 'firstName', 'lastName', 'avatar'],
                        where: {
                            id: createdBy
                        }
                    });

                    //IMP: Call .toString() on the image attribute of the content object
                    content.image = await content.image.toString();
                    
                    let author = {};

                    let authorData = await rawAuthor.dataValues;
                    console.log(authorData.id); 
                    
                    author.name = authorData.firstName + ' ' + authorData.lastName;

                    if(authorData.avatar)
                        author.avatar = authorData.avatar.toString();

                    content.author = author;

                    await articles[tag].push(content);
                }
            }
        }
    }

    return articles;
}

articleRouter.route('/')
    .get((req, res, next) => {
    
        const articleId = req.query.articleId;
        console.log(articleId);

        getArticleById(articleId)
            .then((article) => getArticleAuthor(article))
            .then((response) => {

                console.log(response);
                const { author, article } = response;
                //console.log(article.image.toString());
                
                //Prepare the response to be sent
                res.status(200).send({
                    error: false,
                    errorMessage: 'ERR_NONE',
                    articleTitle: response.article.title,
                    articleBody: article.body,
                    articleImage: article.image.toString(),
                    articleReads: article.nReads,
                    articleLikes: article.nLikes,
                    author: {
                        authorName: `${author.firstName} ${author.lastName}`,
                        authorAbout: author.about,
                        authorAvatar: author.avatar ? author.avatar.toString() : null
                    }                 
                });
                    
            })
            .catch(error => {
                console.error(error);
                res.status(200).send({ error: true, errorMessage: 'ERR_SOME', articleId: articleId });
            });
    });

articleRouter.route('/new')
    
    .post((req, res, next) => {
        //Here is the enpoint to publish a new article

        publishNewArticle(req.body)
            .then((blogId) => insertArticleIntoUser(req.body.userId, blogId))
            .then((newBlogId, userId) => {
                res
                    .status(200)
                    .header('Access-Control-Allow-Origin', '*')
                    .send({ error: false, errorMessage: 'ERR_NONE', newBlogId: newBlogId });
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

        getRandomArticleIds()
            .then((articleIds) => getArticles(articleIds, userId))
            .then((articles) => {
                res.send(articles);
            })
            .catch(error => console.error(error));
    });


module.exports = articleRouter;