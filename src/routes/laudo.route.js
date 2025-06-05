const express = require('express')
const LaudoController = require('../controllers/laudo.controller')
const router = express.Router()
const { authenticate, authorize } = require('../middlewares/auth')

/**
 * @swagger
 * tags:
 *   name: Laudos
 *   description: API para gerenciamento de laudos periciais
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Laudo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente
 *         title:
 *           type: string
 *           description: Título do laudo
 *         numeroLaudo:
 *           type: string
 *           description: Número do laudo
 *         dataEmissao:
 *           type: string
 *           format: date
 *           description: Data de emissão do laudo
 *         tipoLaudo:
 *           type: string
 *           description: Tipo do laudo
 *          conteudo:
 *           type: string
 *           description: Conteúdo geral do laudo
 *         introducao:
 *           type: string
 *           description: Introdução do laudo
 *         metodologia:
 *           type: string
 *           description: Metodologia utilizada no laudo
 *         analiseResultados:
 *           type: string
 *           description: Análise dos resultados obtidos
 *         conclusao:
 *           type: string
 *           description: Conclusão do laudo
 */

/**
 * @swagger
 * /api/laudos:
 *   post:
 *     summary: Cria um novo laudo
 *     tags: [Laudos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laudo'
 *     responses:
 *       201:
 *         description: Laudo criado com sucesso
 *       500:
 *         description: Erro ao criar laudo
 */
router.post('/', authenticate, authorize(['admin', 'perito']), LaudoController.createLaudo)

/**
 * @swagger
 * /api/laudos:
 *   get:
 *     summary: Lista todos os laudos
 *     tags: [Laudos]
 *     responses:
 *       200:
 *         description: Lista de laudos
 *       500:
 *         description: Erro ao buscar laudos
 */
router.get('/', authenticate, authorize(['admin', 'perito', 'assistente']), LaudoController.getLaudo)

/**
 * @swagger
 * /api/laudos/{id}:
 *   get:
 *     summary: Busca um laudo por ID
 *     tags: [Laudos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo
 *     responses:
 *       200:
 *         description: Laudo encontrado
 *       404:
 *         description: Laudo não encontrado
 */
router.get('/:id', authenticate, authorize(['admin', 'perito', 'assistente']), LaudoController.getLaudoById)

/**
 * @swagger
 * /api/laudos/{id}:
 *   put:
 *     summary: Atualiza um laudo existente
 *     tags: [Laudos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laudo'
 *     responses:
 *       200:
 *         description: Laudo atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao atualizar laudo
 */
router.put('/:id', authenticate, authorize(['admin', 'perito']), LaudoController.updateLaudo)

/**
 * @swagger
 * /api/laudos/{id}:
 *   delete:
 *     summary: Deleta um laudo por ID
 *     tags: [Laudos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo
 *     responses:
 *       200:
 *         description: Laudo deletado com sucesso
 *       404:
 *         description: Laudo não encontrado
 */
router.delete('/:id', authenticate, authorize(['admin']), LaudoController.deleteLaudoById)

/**
 * @swagger
 * /api/laudos:
 *   delete:
 *     summary: Deleta todos os laudos
 *     tags: [Laudos]
 *     responses:
 *       200:
 *         description: Todos os laudos deletados
 *       500:
 *         description: Erro ao deletar laudos
 */
router.delete('/', authenticate, authorize(['admin']), LaudoController.deleteLaudo)

module.exports = router
