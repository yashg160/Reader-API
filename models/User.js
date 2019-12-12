const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'reader',
    username: 'root',
    password: 'root_password'
});

class User extends Model { 
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    get emailId() {
        return this.email;
    }

    get id() {
        return this._id;
    }

    get avatar() {
        return this.avatar;
    }

    get choices() {
        return this.choices;
    }

    get profileCompleted() {
        return this.profileCompleted;
    }

    get about() {
        return this.about;
    }

    get writtenBlogs() {
        return this.writtenBlogs;
    }

    //TODO: setters for properties
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        type: Sequelize.BLOB
    },
    writtenBlogs: {
        type: Sequelize.JSON
    },
    choices: {
        type: Sequelize.JSON
    }
}, {
    sequelize, 
    modelName: 'user'
});

module.exports = User;