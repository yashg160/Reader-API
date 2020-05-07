const Sequelize = require('sequelize');
const Model = Sequelize.Model;

/* const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
}); */

const sequelize = new Sequelize("mysql://b6b61469288269:a42efa6b@us-cdbr-east-06.cleardb.net/heroku_e2a64bd5a684d4a?reconnect=true");

class Entertainment extends Model { }

Entertainment.init({
    articleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
        freezeTableName: true,
        modelName: 'entertainment',
        timestamps: false
});

class Faishon extends Model { }

Faishon.init({
    articleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
        freezeTableName: true,
        modelName: 'faishon',
        timestamps: false
});

class Fitness extends Model { }

Fitness.init({
    articleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
    freezeTableName: true,
        modelName: 'fitness',
        timestamps: false
});

class Finance extends Model { }

Finance.init({
    articleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
        sequelize,
        freezeTableName: true,
        modelName: 'finance',
        timestamps: false
});

class Relationship extends Model { }

Relationship.init({
    articleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    freezeTableName: true,
        modelName: 'relationship',
        timestamps: false
});

class Technology extends Model { }

Technology.init({
    articleId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    freezeTableName: true,
    modelName: 'technology',
    timestamps: false
});

Entertainment.removeAttribute('id');
Entertainment.removeAttribute('createdAt');
Entertainment.removeAttribute('updatedAt');

Faishon.removeAttribute('id');
Faishon.removeAttribute('createdAt');
Faishon.removeAttribute('updatedAt');

Fitness.removeAttribute('id');
Fitness.removeAttribute('createdAt');
Fitness.removeAttribute('updatedAt');

Finance.removeAttribute('id');
Finance.removeAttribute('createdAt');
Finance.removeAttribute('updatedAt');

Relationship.removeAttribute('id');
Relationship.removeAttribute('createdAt');
Relationship.removeAttribute('updatedAt');

Technology.removeAttribute('id');
Technology.removeAttribute('createdAt');
Technology.removeAttribute('updatedAt');

const Tags = { Entertainment, Faishon, Fitness, Finance, Relationship, Technology };
module.exports = Tags;