// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicialización de variables
var app = express();

// Consexión a la BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, response) => {
    if (err) throw err;
    console.log('Mongo database port 27017: \x1b[32m%s\x1b[0m', 'online');
});

// Rutas
app.get('/', (request, response, next) => {

    response.status(200).json({
        ok: true,
        message: 'The request has been successful'
    })

});


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});