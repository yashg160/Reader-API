var app = require('./app');
var http = require('http');
var fs = require('fs');
var mysql = require('mysql2');
var Sequelize = require('sequelize');



const port = 3001;

app.set('port', port);
app.set('secPort', port + 443);

/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root_password',
    database: 'reader'
}); */
const sequelize = new Sequelize({
    database: 'reader',
    username: 'root',
    password: 'root_password',
    dialect: 'mysql'
});

/* db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
}); */
module.export = sequelize
    .authenticate()
    .then(() => console.log('Connected to server.'))
    .catch(err => console.error('Error occurred while connecting with server', err));
/* global.db = db; */

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', error => console.log(error));
server.on('listening', () => console.log('Server running on port ', port));
