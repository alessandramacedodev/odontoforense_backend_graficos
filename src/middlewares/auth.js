const jwt = require('jsonwebtoken')
const User = require('../models/usuario')
require('dotenv').config()

async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ','')) {
        return res.status(401).json({message: 'Token não fornecido'})
    }
    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-senha')
        next()
    } catch (err) {
        console.error('Erro ao verificar JWT:', err.message)
        return res.status(401).json({message: 'Token inválido'})
    }
}

function authorize(perfis = []) {
    if(typeof perifl === 'string') {
        perfis = [perfis]
    }
    return (req, res, next) => {
        if(!perfis.includes(req.user.perfil)) {
            return res.status(403).json({message: 'Acesso negado: permissão insuficiente'})
        }
        next()
    }
}



module.exports = {authenticate, authorize}
