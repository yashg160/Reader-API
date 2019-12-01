var express = require('express');
var bodyParser = require('body-parser');

var usersRouter = express.Router();
usersRouter.use(bodyParser.json());

usersRouter.route('/')
    .get((req, res, next) => {

        console.log(req.query);

        const query = `SELECT * FROM USERS WHERE email = '${req.query.email}';`;
        console.log(query);

        db.query(query, (error, results, fields) => {
            if (error) {
                //Some error occurred while running the query
                console.error(error);
                res.status(400).send({ error: true, errorMessage: 'ERR_SERVER', userExists: false, email: req.query.email, password: req.query.password });
            }
            else {
                //No error occurred. Proceed to check if the user's account is valid
                console.log(results);
                if (results.length > 1) {
                    res.status(200).send({ error: true, errorMessage: 'ERR_DUP_ACC', userExists: true, email: req.query.email, password: req.query.password });
                }
                else if (results.length < 1) {
                    res.status(200).send({ error: true, errorMessage: 'ERR_USER_EXISTS', userExists: false, email: req.query.email, password: req.query.password });
                }
                else {
                    //User exists. Verify the password to confirm the identity.
                    if (req.query.password == results[0].password)
                        res.status(200).send({ error: false, errorMessage: 'ERR_NONE', userExists: true, email: req.query.email, password: req.query.password });
                    else
                        res.status(403).send({ error: true, errorMessage: 'ERR_PASSWORD', userExists: true, email: req.query.email, password: req.query.password });
                }
            }
            
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