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

usersRouter.route('/')
    .get((req, res, next) => {
        console.log(req.query);

        getUser(req.query)
            .then(users => {
                console.log(users);
                if (users.length > 1) {
                    res.status(200).send({ error: true, errorMessage: 'ERR_DUP_ACC', userExists: true, email: req.query.email, password: req.query.password});
                }
                else if(users.length < 1) {
                    res.status(200).send({ error: true, errorMessage: 'ERR_USER_EXISTS', userExists: false, email: req.query.email, password: req.query.password});
                    
                }
                else if(users.length == 1){
                    if (users[0].dataValues.password === req.query.password) {
                        res.status(200)
                            .cookie('userEmail', req.query.email, { maxAge: 60 * 60 * 24 * 5 })
                            .cookie('userPassword', req.query.password, { maxAge: 60 * 60 * 24 * 5 })
                            .cookie('userAuthenticated', true, { maxAge: 60 * 60 * 24 * 5 })
                            .send({ error: false, errorMessage: 'ERR_NONE', userExists: true, email: req.query.email, password: req.query.password });
                    }
                    else
                        res.status(403).send({ error: true, errorMessage: 'ERR_PASSWORD', userExists: true, email: req.query.email, password: req.query.password});
                }
            })
            .catch(error => {
                console.log(error);
                res.status(400).send({ error: true, errorMessage: 'ERR_SOME', userExists: false, email: req.query.email, password: req.query.password})
            });
    })
    .post((req, res, next) => {
        console.log(req.body);

        createUser(req.body)
            .then((user) => {
                console.log(user);
                const token = authenticate.getToken(user.dataValues);
                res.status(200).send({ error: false, errorMessage: 'ERR_NONE', userCreated: true, email: req.body.email, password: req.body.password, token: token });
            })
            .catch(error => {
                console.log(error);
                res.status(406).send({ error: true, errorMessage: 'ERR_DUP_ENTRY', userCreated: false, email: req.body.email, password: req.body.password, token:null });
            });
    })

module.exports = usersRouter;