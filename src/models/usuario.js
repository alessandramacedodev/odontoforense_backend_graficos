const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Esquema de usuário
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
               
    },
    senha: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        enum: ['admin', 'perito', 'assistente'],
        default: 'assistente'
    }
}, { timestamps: true })

// Hash da senha antes de salvar
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next()
    const salt = await bcrypt.genSalt(10)
    this.senha = await bcrypt.hash(this.senha, salt)
    next()
})

// Método para gerar o token JWT
usuarioSchema.methods.generateTokenJWT = function () {
    return jwt.sign(
        { id: this._id, perfil: this.perfil },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    )
}

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario
