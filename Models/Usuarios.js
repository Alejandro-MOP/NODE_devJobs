const mongoose = require('mongoose');
const slug = require('slug');
const bcrytp = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token:{
        type: String
    },
    expira: {
        type: Date
    }
});

//Fn para hashear password
usuariosSchema.pre('save', async function(next){

    if(!this.isModified('password')) {
        return next();
    }

    const hash = await bcrytp.hash(this.password, 12);

    this.password = hash;
    next();
})

module.exports = mongoose.model('Usuarios', usuariosSchema);