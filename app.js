// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Importar Rutas
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var loginRoutes = require('./routes/login');

// Inicialización de variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Consexión a la BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, response) => {
    if (err) throw err;
    console.log('Mongo database port 27017: \x1b[32m%s\x1b[0m', 'online');
});

// Rutas
app.use('/usuarios', userRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});