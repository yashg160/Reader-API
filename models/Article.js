const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
});

class Article extends Model { }

Article.init({
    id: {
        type: Sequelize.STRING4,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    body: {
        type: Sequelize.TEXT
    },
    reads: {
        type: Sequelize.NUMBER
    },
    likes: {
        type: Sequelize.NUMBER
    },
    createdBy: {
        type: Sequelize.NUMBER
    }
}, {
    sequelize,
    modelName: 'article'
});

module.exports = Article;