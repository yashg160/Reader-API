const Sequelize = require('sequelize');
const Model = Sequelize.Model;

/* const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
}); */

const sequelize = new Sequelize("mysql://b6b61469288269:a42efa6b@us-cdbr-east-06.cleardb.net/heroku_e2a64bd5a684d4a?reconnect=true");

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