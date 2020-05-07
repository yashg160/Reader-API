var app = require('./app');
var http = require('http');
var Sequelize = require('sequelize');



const port = 3001;

app.set('port', port);
app.set('secPort', port + 443);

/* const db = mysql.createConnection({
    host: 'localhost',
    user: 'yash',
    password: 'password',
    database: 'reader',
    port: 3306
});
console.log("Connection object created")
db.connect(error => {
    if(error) console.error(error);
    else console.info("Connected to database");
}); */
/* const sequelize = new Sequelize("reader", "yash", "password", {
    host: "localhost",
    dialect: "mysql"
});
 */

const sequelize = new Sequelize("mysql://b6b61469288269:a42efa6b@us-cdbr-east-06.cleardb.net/heroku_e2a64bd5a684d4a?reconnect=true");

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
