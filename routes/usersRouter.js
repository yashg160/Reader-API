var express = require('express');
var bodyParser = require('body-parser');

var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

usersRouter.route('/')
    .get((req, res, next) => {
        console.log(req.query.email);
        const query = `SELECT * FROM USERS WHERE email = '${req.query.email}';`;
        console.log(query);
        db.query(query, (error, results, fields) => {
            console.log(results);
            res.status(200).send({ done: 'success'});
        });
    })
    .post((req, res, next) => {
        console.log(req.body);
        
        const query = `INSERT INTO users (email, password) VALUES ('${req.body.email}', '${req.body.password}');`;
        console.log(query);
        
        db.query(query, (error, results, fields) => {
            if (error) {
                console.error(error);
                res.status(406);
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                return res.send({ error: true, errorMessage: 'ERR_DUP_ENTRY', userCreated: false, email: req.body.email, password: req.body.password });
            }
            else {
                console.log(results);
                res.status(200);
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                return res.send({ error: false, errorMessage: 'ERR_NONE', userCreated: true, email: req.body.email, password: req.body.password });
            }
        });
    })

module.exports = usersRouter;