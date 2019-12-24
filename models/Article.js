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
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
    },
    body: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.BLOB('long')
    },
    nReads: {
        type: Sequelize.NUMBER
    },
    nLikes: {
        type: Sequelize.NUMBER
    },
    createdBy: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'article'
});

module.exports = Article;