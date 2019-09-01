var express = require('express');

var app = express();

app.get('/', (request, response, next) => {

    response.status(200).json({
        ok: true,
        message: 'The request has been successful'
    })

});

module.exports = app;