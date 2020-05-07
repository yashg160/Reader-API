const Sequelize = require('sequelize');
const Model = Sequelize.Model;

/* const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
}); */

const sequelize = new Sequelize("mysql://b6b61469288269:a42efa6b@us-cdbr-east-06.cleardb.net/heroku_e2a64bd5a684d4a?reconnect=true");

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
    writtenArticles: {
        type: Sequelize.JSON
    }
}, {
    sequelize, 
    modelName: 'user'
});

module.exports = User;