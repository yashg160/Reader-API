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
        });
    })
    .post((req, res, next) => {
        console.log(req.body);
        
        const query = `INSERT INTO users (email, password) VALUES ('${req.body.email}', '${req.body.password}');`;
        console.log(query);
        
        let response = null;
        db.query(query, (error, results, fields) => {
            if (error) {
                console.error(error);
                response = error;
            }
            console.log(results);
            res.statusCode = 200;
            res.set('Content-Type', 'application/json');
            res.set('Access-Control-Allow-Origin', '*');
            res.send({ done: 'success' });
        });
    })

module.exports = usersRouter;