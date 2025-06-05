const express = require('express')
const usuarioController = require('../controllers/user.controller')
const { authenticate, authorize } = require('../middlewares/auth')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   - name: Usuários
 *     description: API para gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do usuário (gerado automaticamente)
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *         perfil:
 *           type: string
 *           enum: [admin, perito, assistente]
 *           description: Função do usuário
 *         senha:
 *           type: string
 *           description: Senha do usuário (não será retornada)
 *         token:
 *           type: string
 *           description: Token JWT gerado para autenticação
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao criar usuário
 */
router.post('/', authenticate, authorize(['admin']), usuarioController.createUsuario)

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado
 *       400:
 *         description: E-mail ou senha incorretos
 *       500:
 *         description: Erro ao realizar login
 */
router.post('/login', usuarioController.login)

/**
 * @swagger
 * /api/usuarios/logout:
 *   post:
 *     summary: Realiza o logout de um usuário
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: O usuário não está autenticado
 *       500:
 *         description: Erro ao realizar o logout
 */
router.post('/logout', authenticate, authorize(['admin', 'perito', 'assistente']), usuarioController.logout)

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao listar usuários
 */
router.get('/', authenticate, authorize(['admin']), usuarioController.getUsuarios)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar o usuário
 */
router.get('/:id', authenticate, authorize(['admin', 'perito', 'assistente']), usuarioController.getUsuarioById)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuarioAtualizado:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: ID inválido ou dados do usuário incorretos
 *       500:
 *         description: Erro ao atualizar o usuário
 */
router.put('/:id', authenticate, authorize(['admin']), usuarioController.updateUsuario)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar o usuário
 */
router.delete('/:id', authenticate, authorize(['admin']), usuarioController.deleteUsuarioById)

/**
 * @swagger
 * /api/usuarios:
 *   delete:
 *     summary: Deleta todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Todos os usuários foram deletados com sucesso
 *       500:
 *         description: Erro ao deletar todos os usuários
 */
router.delete('/', authenticate, authorize(['admin']), usuarioController.deleteUsuarios)

module.exports = router
