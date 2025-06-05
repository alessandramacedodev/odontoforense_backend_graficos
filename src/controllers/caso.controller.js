const Caso = require ('../models/caso')

const createCaso = async (req, res) => {
    try {
        const createCaso = new Caso({
            numeroDoCaso: req.body.numeroDoCaso,
            dataDeAbertura: req.body.dataDeAbertura,
            peritoResponsavel: req.body.peritoResponsavel,
            status: req.body.status,
            local: req.body.local,
            solicitadoPor: req.body.solicitadoPor,
            descricao: req.body.descricao,
            detalhes: req.body.detalhes
        });
        await createCaso.save()
        res.status(201).json({message: 'Caso adicionado com sucesso!', createCaso: createCaso})
    } catch (err) {
        console.error('Erro ao adicionar caso:', err)
        res.status(500).json({error: 'Erro ao adicionar caso.', details: err.message})
    }
}

const getCaso = async (req, res) => {
    try {
        const casos = await Caso.find()
        console.log('Casos encontrados:', casos)
        res.status(200).json(casos)
    } catch (err) {
        console.error({message: 'Erro ao listar os casos:', err});
        res.status(500).json({error: 'Erro ao listar os casos.', details: err.message})
    }
}

const getCasoById = async (req, res) => {
    const {id} = req.params

    if(!id || id.trim() === "") {
        return res.status(400).json({message: `ID não fornecido na URL da requisição.`})
    }
    try {
        const caso = await Caso.findById(id)
        if(caso) {
            res.status(200).json(caso)
        } else {
            res.status(404).json({message: `Não foi encontrado nenhum caso com essa id=${id}.`})
        }
    } catch (err) {
        console.error({message: 'Erro ao buscar caso:', err})
        res.status(500).json({error: 'Erro ao buscar caso.'})
    }
}

const updateCaso = async (req, res) => {
    const {id} = req.params

    try {
        const updatedCaso = await Caso.findOneAndUpdate(
            {_id: id},
            req.body,
            {new: true}
        )
        if(!updatedCaso) {
            return res.status(400).json({message: `Não foi encontrado nenhum caso com essa id=${id}.`})
        }
        res.status(200).json({message: 'Caso atualizado com sucesso!', updatedCaso})
    } catch (err) {
        console.error('Erro ao atualizar caso:', err)
        res.status(500).json({error: 'Erro ao atualizar caso.'})
    }
}


const deleteCasoById = async (req, res) => {
    const {id} = req.params

    try {
        const deletedCaso = await Caso.deleteOne({_id: id})
        
        if(deletedCaso.deletedCount === 0) {
            return res.status(404).json({message: `Nenhum caso encontrado com essa id=${id}.`})
        }
        res.status(200).json({message: `Caso com ID=${id} foi deletado com sucesso!`})
    } catch (err) {
        console.error('Erro ao deletar caso:', err)
        res.status(500).json({message: 'Erro ao deletar caso.'})
    }
}

const deleteCaso = async (req, res) => {
    try {
        const deletedCaso = await Caso.deleteMany()
        res.status(200).json({message: 'Todos os casos foram deletados com sucesso!', deletedCount: deletedCaso.deletedCount})
    } catch (err) {
        console.error('Erro ao deletar todos os casos:', err)
        res.status(500).json({error: 'Erro ao deletar todos os casos.'})
    }
}



module.exports = {
    createCaso,
    getCaso,
    getCasoById,
    updateCaso,
    deleteCaso,
    deleteCasoById
}
