var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

var userSchema = new Schema({
    name: {type: String, required: [true, 'El nombre es obligatorio']},
    email: {type: String, unique: true, required: [true, 'El email es obligatorio']},
    password: {type: String, required: [true, 'La contraseña es obligatoria']},
    img: {type: String, required: false },
    role: {type: String, required: false, default: 'USER_ROLE', enum: validRoles},
});

userSchema.plugin( uniqueValidator, {message: '{PATH} must be unic'})

module.exports = mongoose.model('Usuario', userSchema);