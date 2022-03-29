

const {model, Schema} = require('mongoose') ;

const UserSchema = Schema({
    nombre:{
        type: String,
        required: [true, ' El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, ' El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, ' La contraseña es obligatoria']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        // enum: ['ADMIN_ROL', 'USER_ROL']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function () {
    const {password, ...user} = this.toObject();
    return user;
}

module.exports = model('Usuario', UserSchema);