const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

// Criar usuário
const createUsuario = async (req, res) => {
    try {
        const usuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            perfil: req.body.perfil
        })
        await usuario.save()
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: usuario })
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err)
        res.status(500).json({ error: 'Erro ao cadastrar usuário.', details: err.message })
    }
}

// Listar todos os usuários
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-senha')
        res.status(200).json(usuarios)
    } catch (err) {
        console.error('Erro ao listar usuários:', err)
        res.status(500).json({ error: 'Erro ao listar usuários.' })
    }
}

// Buscar usuário por ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({ message: 'ID não fornecido na URL da requisição.' })
    }
    try {
        const usuario = await Usuario.findById(id).select('-senha')
        if (usuario) {
            res.status(200).json(usuario)
        } else {
            res.status(404).json({ message: `Usuário não encontrado com essa id=${id}.` })
        }
    } catch (err) {
        console.error('Erro ao encontrar usuário:', err)
        res.status(500).json({ error: 'Erro ao encontrar usuário.' })
    }
}

// Login
const login = async (req, res) => {
    const { email, senha } = req.body
    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario)
            return res.status(400).json({ message: 'Usuário não encontrado' })

        const isMatch = await bcrypt.compare(senha, usuario.senha)
        if (!isMatch)
            return res.status(400).json({ message: 'Senha incorreta' })

        const token = usuario.generateTokenJWT()
        res.status(200).json({
            message: 'Login bem-sucedido',
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            },
            token
        })
    } catch (err) {
        console.error('Erro ao realizar login:', err)
        res.status(500).json({ error: 'Erro ao realizar login' })
    }
}

// Logout
const logout = (req, res) => {
    res.status(200).json({ message: 'Logout bem-sucedido' })
}

// Atualizar usuário
const updateUsuario = async (req, res) => {
    const { id } = req.params
    if (req.body.senha && req.body.senha.trim() !== '') {
        req.body.senha = await bcrypt.hash(req.body.senha, 10)
    } else {
        delete req.body.senha
    }
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if (!updatedUsuario) {
            return res.status(404).json({ message: `Usuário não encontrado com essa id=${id}.` })
        }
        const usuarioResponse = updatedUsuario.toObject()
        delete usuarioResponse.senha
        res.status(200).json({ message: 'Usuário atualizado com sucesso!', updatedUsuario: usuarioResponse })
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err)
        res.status(500).json({ error: 'Erro ao atualizar usuário.' })
    }
}

// Deletar usuário por ID
const deleteUsuarioById = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' })
    }

    try {
        const deletedUsuario = await Usuario.deleteOne({ _id: id })
        if (deletedUsuario.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhum usuário encontrado com essa id=${id}.` })
        }

        res.status(200).json({ message: `Usuário com ID=${id} foi deletado com sucesso!` })
    } catch (err) {
        console.error('Erro ao deletar usuário:', err)
        res.status(500).json({ error: 'Erro ao deletar usuário.' })
    }
}

// Deletar todos os usuários
const deleteUsuarios = async (req, res) => {
    try {
        if (req.usuario.perfil !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Somente administradores podem deletar todos os usuários.' })
        }
        const deletedUsuarios = await Usuario.deleteMany()
        res.status(200).json({
            message: 'Todos os usuários foram deletados com sucesso!',
            deletedCount: deletedUsuarios.deletedCount
        })
    } catch (err) {
        console.error('Erro ao deletar todos os usuários:', err)
        res.status(500).json({ error: 'Erro ao deletar todos os usuários.' })
    }
}

// Exportação
module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    login,
    logout,
    updateUsuario,
    deleteUsuarioById,
    deleteUsuarios
}
