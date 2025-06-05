const express = require('express')
const BancoOdontoController = require('../controllers/bancoodonto.controller')
const { authenticate, authorize } = require('../middlewares/auth')
const upload = require('../middlewares/upload') // multer para upload
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Banco OdontoLegal
 *   description: API para gerenciamento dos laudos periciais odontológicos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BancoOdonto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tipodoregistro:
 *           type: string
 *           enum: [ANTE-MORTEM, POST-MORTEM]
 *         caracteristica:
 *           type: string
 *         dataRegistro:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *         fileURL:
 *           type: string
 *           format: uri
 *         conteudoLaudo:
 *           type: object
 *           properties:
 *             tipoDenticao:
 *               type: string
 *             caracteristicasEspecificas:
 *               type: string
 *             regiao:
 *               type: string
 *             introducao:
 *               type: string
 *             metodologia:
 *               type: string
 *             analiseEResultados:
 *               type: string
 *             conclusao:
 *               type: string
 */

/**
 * @swagger
 * /api/banco-odonto:
 *   post:
 *     summary: Cria um novo laudo pericial odontológico
 *     tags: [Banco OdontoLegal]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipodoregistro:
 *                 type: string
 *               caracteristica:
 *                 type: string
 *               dataRegistro:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *               conteudoLaudo:
 *                 type: string
 *                 description: JSON string contendo os dados do laudo
 *     responses:
 *       201:
 *         description: Laudo criado com sucesso
 *       500:
 *         description: Erro ao criar laudo
 */
router.post( '/', authenticate,authorize(['admin', 'perito']), upload.single('file'), BancoOdontoController.createBancoOdonto)

/**
 * @swagger
 * /api/banco-odonto:
 *   get:
 *     summary: Lista todos os laudos
 *     tags: [Banco OdontoLegal]
 *     responses:
 *       200:
 *         description: Lista de laudos retornada com sucesso
 *       500:
 *         description: Erro ao listar laudos
 */
router.get('/', authenticate,authorize(['admin', 'perito', 'assistente']),BancoOdontoController.getBancoOdonto)

/**
 * @swagger
 * /api/banco-odonto/{id}:
 *   get:
 *     summary: Retorna um laudo pelo ID
 *     tags: [Banco OdontoLegal]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Laudo encontrado
 *       404:
 *         description: Laudo não encontrado
 */
router.get('/:id', authenticate, authorize(['admin', 'perito', 'assistente']), BancoOdontoController.getBancoOdontoById)

/**
 * @swagger
 * /api/banco-odonto/{id}:
 *   put:
 *     summary: Atualiza um laudo existente
 *     tags: [Banco OdontoLegal]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BancoOdonto'
 *     responses:
 *       200:
 *         description: Laudo atualizado com sucesso
 *       400:
 *         description: ID inválido ou laudo não encontrado
 */
router.put('/:id', authenticate, authorize(['admin', 'perito']), BancoOdontoController.updateBancoOdonto)

/**
 * @swagger
 * /api/banco-odonto/{id}:
 *   delete:
 *     summary: Remove um laudo pelo ID
 *     tags: [Banco OdontoLegal]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Laudo removido com sucesso
 *       404:
 *         description: Laudo não encontrado
 */
router.delete('/:id', authenticate, authorize(['admin', 'perito']), BancoOdontoController.deleteBancoOdontoById)

/**
 * @swagger
 * /api/banco-odonto:
 *   delete:
 *     summary: Remove todos os laudos
 *     tags: [Banco OdontoLegal]
 *     responses:
 *       200:
 *         description: Todos os laudos foram removidos
 */
router.delete('/', authenticate, authorize(['admin']), BancoOdontoController.deleteBancoOdonto)

module.exports = router
