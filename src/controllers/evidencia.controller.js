const Evidencia = require('../models/evidencia')

const createEvidencia = async (req, res) => {
    try {
        const fileUrl = req.file ? req.file.path : req.body.fileUrl;
        const evidencia = new Evidencia({
            fileUrl: fileUrl,
            nome_evidencia: req.body.nome_evidencia, 
            categoria: req.body.categoria, 
            data_coleta: req.body.data_coleta,
            descricao: req.body.descricao, 
            local_retirada: req.body.local_retirada,
            coletadoPor: req.body.coletadoPor,
            caso: req.body.caso
        })
        await evidencia.save()
        res.status(201).json({message: 'Evidência adicionado com sucesso!', evidencia: evidencia})
    } catch (err) {
        console.error('Erro ao adicionar evidência:', err)
        res.status(500).json({error: 'Erro ao adicionar evidência.', details: err.message})
    }
}

const getEvidencia = async (req, res) => {
    try {
        const evidencia = await Evidencia.find()
        res.status(201).json(evidencia)
    } catch (err) {
        console.error({message: 'Erro ao listar as evidências:', err});
        res.status(500).json({error: 'Erro ao listar as evidências.', details: err.message})
    }
}

const getEvidenciaById = async (req, res) => {
    const {id} = req.params
    
    if(!id || id.trim() === "") {
        return res.status(400).json({message: `ID não fornecido na URL da requisição.`})
    }
    try {
        const evidencia = await Evidencia.findById(id)
        if(evidencia) {
            res.status(200).json(evidencia)
        } else {
            res.status(404).json({message: `Não foi encontrado nenhuma evidência com essa id=${id}.`})
        }
    } catch (err) {
        console.error({message: 'Erro ao buscar evidência:', err})
        res.status(500).json({error: 'Erro ao buscar evidência.'})
    }
}

const updateEvidencia = async (req, res) => {
    const {id} = req.params

    try {
        const updatedEvidencia = await Evidencia.findOneAndUpdate(
            {_id: id},
            req.body,
            {new: true}
        )
        if(!updatedEvidencia) {
            return res.status(400).json({message: `Não foi encontrado nenhuma evidência com essa id=${id}.`})
        }
        res.status(200).json({message: 'Evidência atualizada com sucesso!', updatedEvidencia})
    } catch (err) {
        console.error('Erro ao atualizar evidência:', err)
        res.status(500).json({error: 'Erro ao atualizar evidência.'})
    }
}

const deleteEvidenciaById = async (req, res) => {
    const {id} = req.params

    try {
        const deletedEvidencia = await Evidencia.deleteOne({_id: id})
        
        if(deletedEvidencia.deletedCount === 0) {
            return res.status(404).json({message: `Nenhuma evidência encontrada com essa id${id}.`})
        }

        
        res.status(200).json({message: `Evidência com ID=${id} foi deletado com sucesso!`})
    } catch (err) {
        console.error('Erro ao deletar evidência:', err)
        res.status(500).json({message: 'Erro ao deletar evidência.'})
    }
}

const deleteEvidencia = async (req, res) => {
    try {
        const deleteEvidencia = await Evidencia.deleteMany()
        res.status(200).json({message: 'Todas as evidências foram deletadas com sucesso!', deletedCount: deleteEvidencia.deletedCount})
    } catch (err) {
        console.error('Erro ao deletar todas as evidências:', err)
        res.status(500).json({error: 'Erro ao deletar todas as evidências.'})
    }
}

module.exports = {
    createEvidencia,
    getEvidencia,
    getEvidenciaById,
    updateEvidencia,
    deleteEvidenciaById,
    deleteEvidencia
}