var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAuthentication = require('./../middlewares/authentication');
var app = express();
var Usuario = require('./../models/user');


// GET ALL USERS
app.get('/', (request, response, next) => {

    Usuario.find({ }, 'name email img role')    
        .exec(
            (err, usuarios) => {

            if (err) {
                return response.status(500).json({
                    ok: false,
                    message: 'Server error when getting user',
                    errors: err
                });
            };

            return response.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        });
});

// PUT EXISTING USER
app.put('/:id', mdAuthentication.verifyToke, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Server error when finding user',
                errors: err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'The user with the id' + id + 'doesnt exist',
                errors: {message: 'The user doesnt exist'}
            });
        }

        user.name = body.name
        user.email = body.email
        user.role = body.role

        user.save( (err, savedUser) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Server error when actualacing user',
                    errors: err
                });
            }

            user.password = ':)'

            res.status(200).json({
                ok: true,
                user: savedUser
            });
        });

    });

});

// POST NEW USER
app.post('/', mdAuthentication.verifyToke, (req, res) => {
    
    var body = req.body;

    var user = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    user.save( (err, savedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Server error when creating user',
                errors: err
            });
        };

        res.status(201).json({
            ok: true,
            user: savedUser,
            userToken: req.user
        });

    });

});

// DELETE EXISTING USER
app.delete( '/:id', mdAuthentication.verifyToke, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove( id, (err, deletedUser) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error deleting user',
                errors: err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                message: 'There is no user with the id' + id,
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            user: deletedUser
        });
    });
});

module.exports = app;