var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('./../config/config').SEED;
var app = express();

var Usuario = require('./../models/user');

app.post('/', (req, res) => {

    var body = req.body

    Usuario.findOne({email: body.email}, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Server error when getting user',
                errors: err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                message: 'Wrong credentials - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Wrong credentials - password',
                errors: err
            });
        }

        // Crear token
        userDB.password = ':)';
        var token = jwt.sign({user: userDB}, SEED, {expiresIn: 14400}) //4h

        res.status(200).json({
            ok: true,
            user: userDB,
            token: token,
            id: userDB.id
        });
    });



});


module.exports = app;