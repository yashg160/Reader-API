const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
});

class User extends Model { }

User.init({
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    about: {
        type: Sequelize.STRING
    },
    profileCompleted: {
        type: Sequelize.BOOLEAN
    },
    avatar: {
        type: Sequelize.BLOB('medium')
    },
    writtenBlogs: {
        type: Sequelize.JSON
    }
}, {
    sequelize, 
    modelName: 'user'
});

module.exports = User;