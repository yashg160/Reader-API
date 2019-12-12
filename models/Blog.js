const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
});

class Blog extends Model { }

Blog.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    modelName: 'blog'
});

module.exports = Blog;