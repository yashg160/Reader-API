var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/User');
var crypto = require('crypto');

var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

//Create helper functions to communicate with thwe database using promises

async function createUser(body){
    return new Promise(resolve => {
        const id = crypto.randomBytes(10).toString('hex');
        const user = User.create({
            id: id,
            email: body.email,
            password: body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        resolve(user);
    })
}

async function getUser(query) {
    return new Promise(resolve => {
        const email = query.email;

        const user = User.findAll({
            where: {
                email:query.email
            }
        });
        resolve(user);
    });
}

async function updateUser(body) {
    return new Promise(resolve => {
        console.log(body);
        const { id, name, about } = body;

        //Split the first name and last name
        const nameSplit = name.split(' ');
        const firstName = nameSplit[0];
        const lastName = nameSplit[1];

        const user = User.update({
            firstName: firstName,
            lastName: lastName,
            about: about,
            updatedAt: new Date()
        }, {
            where: {id: id}
        });
        resolve(user);
    })
}

usersRouter.route('/')
    .get((req, res, next) => {

        getUser(req.query)
            .then(users => {
                if (users.length > 1) {
                    res.status(200).send({ error: true, errorMessage: 'ERR_DUP_ACC', userExists: true, email: req.query.email, password: req.query.password });
                }
                else if (users.length < 1) {
                    res.status(200).send({ error: true, errorMessage: 'ERR_USER_EXISTS', userExists: false, email: req.query.email, password: req.query.password });
                    
                }
                else if (users.length == 1) {
                    if (users[0].dataValues.password === req.query.password) {

                        userData = users[0].dataValues;

                        res.status(200)
                            .send({
                                error: false,
                                errorMessage: 'ERR_NONE',
                                userExists: true,
                                user: {
                                    email: userData.email,
                                    password: userData.password,
                                    id: userData.id,
                                    authenticated: true
                            }});
                    }
                    else
                        res.status(200).send({ error: true, errorMessage: 'ERR_PASSWORD', userExists: true, email: req.query.email, password: req.query.password });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(400).send({ error: true, errorMessage: 'ERR_SOME', userExists: false, email: req.query.email, password: req.query.password })
            });
    })
    .put((req, res, next) => {
        console.log(req.body);

        updateUser(req.body)
            .then(rowsUpdated => {
                
                res.status(200)
                    .send({
                        error: false,
                        errorMessage: 'ERR_NONE',
                        userUpdated: true
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(200)
                    .send({ error: true, errorMessage: 'ERR_UPDATE', userUpdated: false });
            });
    })
    .post((req, res, next) => {

        createUser(req.body)
            .then((user) => {
                const userData = user.dataValues;

                res.status(200)
                    .send({
                        error: false,
                        errorMessage: 'ERR_NONE',
                        userCreated: true,
                        user: {
                            id: userData.id,
                            email: userData.email,
                            password: userData.password,
                            authenticated: true
                        }
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(406).send({ error: true, errorMessage: 'ERR_DUP_ENTRY', userCreated: false, email: req.body.email, password: req.body.password});
            });
    });

usersRouter.route('/logout')
    .get((req, res, next) => {
        res.send({ loggedOut: true, error: false, errorMessage: 'ERR_NONE' })

    });
module.exports = usersRouter;