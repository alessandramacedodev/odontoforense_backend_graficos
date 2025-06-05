const express = require('express')
const casoController = require('../controllers/caso.controller')
const { authenticate, authorize } = require('../middlewares/auth')

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints para gerenciamento de casos periciais
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Caso:
 *       type: object
 *       required:
 *         - numeroDoCaso
 *         - dataDeAbertura
 *         - peritoResponsavel
 *         - status
 *         - local
 *         - solicitadoPor
 *         - descricao
 *         - detalhes
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do caso
 *         numeroDoCaso:
 *           type: string
 *         dataDeAbertura:
 *           type: string
 *           format: date
 *         peritoResponsavel:
 *           type: string
 *         status:
 *           type: string
 *           enum: [em_andamento, finalizado, arquivado]
 *           example: em_andamento
 *         local:
 *           type: string
 *         solicitadoPor:
 *           type: string
 *         descricao:
 *           type: string
 *         detalhes:
 *           type: string
 */

/**
 * @swagger
 * /api/casos:
 *   post:
 *     summary: Cria um novo caso pericial
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado com sucesso
 *       500:
 *         description: Erro ao criar caso
 */
router.post('/', authenticate, authorize(['admin', 'perito']), casoController.createCaso)

/**
 * @swagger
 * /api/casos:
 *   get:
 *     summary: Lista todos os casos
 *     tags: [Casos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 *       500:
 *         description: Erro ao listar casos
 */
router.get('/', authenticate, authorize(['admin', 'perito', 'assistente']), casoController.getCaso)

/**
 * @swagger
 * /api/casos/{id}:
 *   get:
 *     summary: Busca um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do caso
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso não encontrado
 */
router.get('/:id', authenticate, authorize(['admin', 'perito', 'assistente']), casoController.getCasoById)

/**
 * @swagger
 * /api/casos/{id}:
 *   put:
 *     summary: Atualiza um caso
 *     tags: [Casos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do caso a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.put('/:id', authenticate, authorize(['admin', 'perito']), casoController.updateCaso)

/**
 * @swagger
 * /api/casos/{id}:
 *   delete:
 *     summary: Deleta um caso pelo ID
 *     tags: [Casos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso deletado com sucesso
 *       404:
 *         description: Caso não encontrado
 */
router.delete('/:id', authenticate, authorize(['admin']), casoController.deleteCasoById)

/**
 * @swagger
 * /api/casos:
 *   delete:
 *     summary: Deleta todos os casos
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Todos os casos deletados com sucesso
 *       500:
 *         description: Erro ao deletar casos
 */
router.delete('/', authenticate, authorize(['admin']), casoController.deleteCaso)

module.exports = router


    