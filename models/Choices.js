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
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'entertainment'
});

class Faishon extends Model { }

Faishon.init({
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'faishon'
});

class Fitness extends Model { }

Fitness.init({
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'fitness'
});

class PersonalFinance extends Model { }

PersonalFinance.init({
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'personalFinance'
});

export default {Entertainment, Faishon, Fitness, PersonalFinance}