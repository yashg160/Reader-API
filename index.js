var app = require('./app');
var http = require('http');
var fs = require('fs');
const mysql = require('mysql');



const port = 3000;

app.set('port', port);
app.set('secPort', port + 443);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root_password',
    database: 'college'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', error => console.log(error));
server.on('listening', () => console.log('Listening successfully'));
