const PDFDocument = require('pdfkit')
const Laudo = require('../models/laudo') 

const createLaudo = async (req, res) => {
    try {
        const laudo = new Laudo({
            tituloLaudo: req.body.tituloLaudo,
            numeroLaudo: req.body.numeroLaudo,
            dataEmissao: req.body.dataEmissao,
            tipoLaudo: req.body.tipoLaudo,
            conteudoLaudo: {
                introducao: req.body.conteudoLaudo.introducao,
                metodologia: req.body.conteudoLaudo.metodologia,
                analiseeResultados: req.body.conteudoLaudo.analiseeResultados,
                conclusao: req.body.conteudoLaudo.conclusao
            }
        });

        await laudo.save();

        
        const laudoFormatado = {
            tituloLaudo: laudo.tituloLaudo,
            numeroLaudo: laudo.numeroLaudo,
            dataEmissao: laudo.dataEmissao.toISOString().split('T')[0],  
            tipoLaudo: laudo.tipoLaudo,
            conteudoLaudo: laudo.conteudoLaudo
        };

        res.status(201).json(laudoFormatado);
    } catch (err) {
        console.error('Erro ao adicionar laudo:', err);
        res.status(500).json({ error: 'Erro ao adicionar laudo.', details: err.message });
    }
};
const getLaudo = async (req, res) => {
    try {
        const laudos = await Laudo.find()
        res.status(201).json(laudos)
    } catch (err) {
        console.error({ message: 'Erro ao listar os laudos:', err })
        res.status(500).json({ error: 'Erro ao listar os laudos.', details: err.message })
    }
}
const getLaudoById = async (req, res) => {
    const { id } = req.params

    if (!id || id.trim() === "") {
        return res.status(400).json({ message: `ID não fornecido na URL da requisição.` })
    }
    try {
        const laudo = await Laudo.findById(id)
        if (laudo) {
            res.status(200).json(laudo)
        } else {
            res.status(404).json({ message: `Não foi encontrado nenhum laudo com essa id=${id}.` })
        }
    } catch (err) {
        console.error({ message: 'Erro ao buscar laudo:', err })
        res.status(500).json({ error: 'Erro ao buscar laudo.' })
    }
}

const updateLaudo = async (req, res) => {
    const { id } = req.params

    try {
        const updatedLaudo = await Laudo.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        if (!updatedLaudo) {
            return res.status(400).json({ message: `Não foi encontrado nenhum laudo com essa id=${id}.` })
        }
        res.status(200).json({ message: 'Laudo atualizado com sucesso!', updatedLaudo })
    } catch (err) {
        console.error('Erro ao atualizar laudo:', err)
        res.status(500).json({ error: 'Erro ao atualizar laudo.' })
    }
}

const deleteLaudoById = async (req, res) => {
    const { id } = req.params
    
    try {
        const deletedLaudo = await Laudo.deleteOne({ _id: id })

        if (deletedLaudo.deletedCount === 0) {
            return res.status(404).json({ message: `Nenhum laudo encontrado com essa id=${id}.` })
        }
        res.status(200).json({ message: `Laudo com ID=${id} foi deletado com sucesso!` })
    } catch (err) {
        console.error('Erro ao deletar laudo:', err)
        res.status(500).json({ message: 'Erro ao deletar laudo.' })
    }
}

const deleteLaudo = async (req, res) => {
    try {
        const deletedLaudos = await Laudo.deleteMany()
        res.status(200).json({ message: 'Todos os laudos foram deletados com sucesso!', deletedCount: deletedLaudos.deletedCount })
    } catch (err) {
        console.error('Erro ao deletar todos os laudos:', err)
        res.status(500).json({ error: 'Erro ao deletar todos os laudos.' })
    }
}

const generateLaudoPdf = async (req, res) => {
    const { id } = req.params

    try {
        const laudo = await Laudo.findById(id)

        if (!laudo) {
            return res.status(404).json({ message: 'Laudo não encontrado.' })
        }

        const contentToSubscribe = `
            Título: ${laudo.title}
            Número: ${laudo.numeroLaudo}
            Tipo: ${laudo.tipoLaudo}
            Data de Emissão: ${new Date(laudo.dataEmissao).toLocaleDateString()}
        `

        const assinatura = assinarLaudo(contentToSubscribe)

        const doc = new PDFDocument()
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `inline; filename="laudo_${id}.pdf"`)

        doc.pipe(res)    

        doc.fontSize(12).text(`Número do Laudo: ${laudo.numeroLaudo || 'Não informado'}`)
        doc.text(`Título: ${laudo.title || 'Não informado'}`)
        doc.text(`Tipo de Laudo: ${laudo.tipoLaudo || 'Não informado'}`)
        doc.text(`Data de Emissão: ${new Date(laudo.dataEmissao).toLocaleDateString()}`)
        doc.moveDown()

        doc.fontSize(14).text('Conteúdo do Laudo', { underline: true })
        doc.fontSize(12).text(laudo.conteudo || 'Não informado')
        doc.moveDown()

        doc.fontSize(14).text('Introdução', { underline: true })
        doc.fontSize(12).text(laudo.introducao || 'Não informada')
        doc.moveDown()

        doc.fontSize(14).text('Metodologia', { underline: true })
        doc.fontSize(12).text(laudo.metodologia || 'Não informada')
        doc.moveDown()

        doc.fontSize(14).text('Análise e Resultados', { underline: true })
        doc.fontSize(12).text(laudo.analiseResultados || 'Não informados')
        doc.moveDown()

        doc.fontSize(14).text('Conclusão', { underline: true })
        doc.fontSize(12).text(laudo.conclusao || 'Não informada')
        doc.moveDown()

        doc.text('---')
        doc.text(`Gerado em: ${new Date().toLocaleString()}`)
        doc.moveDown()

        doc.fontSize(10).text('Assinatura digital:', { underline: true })
        doc.font('Helvetica').fontSize(8).text(assinatura, {
            width: 500
        })

        doc.end()
    } catch (err) {
        console.error('Erro ao gerar PDF do laudo:', err)
        res.status(500).json({ error: 'Erro ao gerar PDF.' })
    }
}

module.exports = {
    createLaudo,
    getLaudo,
    getLaudoById,
    updateLaudo,
    deleteLaudoById,
    deleteLaudo,
    generateLaudoPdf
}
