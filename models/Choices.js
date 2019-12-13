const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
});

class Entertainment extends Model { }

Entertainment.init({
    blogblogId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
        freezeTableName: true,
        modelName: 'entertainment'
});

class Faishon extends Model { }

Faishon.init({
    blogId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
        freezeTableName: true,
    modelName: 'faishon'
});

class Fitness extends Model { }

Fitness.init({
    blogId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
    freezeTableName: true,
    modelName: 'fitness'
});

class Finance extends Model { }

Finance.init({
    blogId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
        freezeTableName: true,
        modelName: 'finance'
});

const Choices = { Entertainment, Faishon, Fitness, Finance };
module.exports = Choices;