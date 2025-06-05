const express = require('express')
const EvidenciaController = require('../controllers/evidencia.controller')
const { authenticate, authorize } = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const router = express.Router()


/**
 * @swagger
 * tags:
 *   name: Evidência
 *   description: API para gerenciamento de evidências
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Evidencia:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da evidência (gerado automaticamente)
 *         nomeDaEvidencia:
 *           type: string
 *           description: Nome da evidência
 *         categoria:
 *           type: string
 *           description: Categoria da evidência (ex: imagem, vídeo, documento)
 *         dataDaColeta:
 *           type: string
 *           format: date
 *           description: Data da coleta da evidência
 *         descricao:
 *           type: string
 *           description: Descrição da evidência
 *         localDaRetirada:
 *           type: string
 *           description: Local onde a evidência foi coletada
 *         fileUrl:
 *           type: string
 *           description: URL do arquivo da evidência
 */

/**
 * @swagger
 * /api/evidencia:
 *   post:
 *     summary: Cria uma nova evidência
 *     tags: [evidencia]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nomeDaEvidencia:
 *                 type: string
 *               categoria:
 *                 type: string
 *               dataDaColeta:
 *                 type: string
 *                 format: date
 *               descricao:
 *                 type: string
 *               localDaRetirada:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *               fileUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evidência adicionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 evidence:
 *                   $ref: '#/components/schemas/Evidencia'
 *       400:
 *         description: Dados inválidos ou ausentes
 *       500:
 *         description: Erro ao adicionar evidência
 */
router.post( '/', authenticate, authorize(['admin', 'perito', 'assistente']), upload.single('file'), EvidenciaController.createEvidencia) 

/**
 * @swagger
 * /api/evidences:
 *   get:
 *     summary: Lista todas as evidências
 *     tags: [Evidência]
 *     responses:
 *       200:
 *         description: Lista de evidências retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evidencia'
 *       500:
 *         description: Erro ao listar as evidências
 */
router.get('/',authenticate,authorize(['admin', 'perito', 'assistente']),EvidenciaController.getEvidencia)

/**
 * @swagger
 * /api/evidences/{id}:
 *   get:
 *     summary: Retorna uma evidência pelo ID
 *     tags: [Evidência]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência
 *     responses:
 *       200:
 *         description: Evidência encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evidencia'
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao buscar evidência
 */
router.get('/:id',authenticate,authorize(['admin','perito','assistente']),EvidenciaController.getEvidenciaById)

/**
 * @swagger
 * /api/evidences/{id}:
 *   put:
 *     summary: Atualiza uma evidência existente
 *     tags: [Evidência]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evidencia'
 *     responses:
 *       200:
 *         description: Evidência atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedEvidence:
 *                   $ref: '#/components/schemas/Evidencia'
 *       400:
 *         description: ID inválido ou evidência não encontrada
 *       500:
 *         description: Erro ao atualizar evidência
 */
router.put('/:id',authenticate,authorize(['admin', 'perito', 'assistente']),EvidenciaController.updateEvidencia)


/**
 * @swagger
 * /api/evidences/{id}:
 *   delete:
 *     summary: Deleta uma evidência pelo ID
 *     tags: [Evidência]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da evidência a ser deletada
 *     responses:
 *       200:
 *         description: Evidência deletada com sucesso
 *       404:
 *         description: Evidência não encontrada
 *       500:
 *         description: Erro ao deletar evidência
 */
router.delete('/:id',authenticate, authorize(['admin']),EvidenciaController.deleteEvidenciaById)

/**
 * @swagger
 * /api/evidences:
 *   delete:
 *     summary: Deleta todas as evidências
 *     tags: [Evidência]
 *     responses:
 *       200:
 *         description: Todas as evidências foram deletadas com sucesso
 *       500:
 *         description: Erro ao deletar todas as evidências
 */
router.delete('/',authenticate,authorize(['admin']),EvidenciaController.deleteEvidencia)

module.exports = router