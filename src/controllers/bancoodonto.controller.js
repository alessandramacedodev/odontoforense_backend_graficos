const bancoodonto = require('../models/bancoodonto');
const mongoose = require('mongoose');

const createBancoOdonto = async (req, res) => {
  try {
    const fileUrl = req.file ? req.file.path : req.body.fileUrl;

    const novoRegistro = new bancoodonto({
      tipodoregistro: req.body.tipodoregistro,
      caracteristica: req.body.caracteristica,
      dataRegistro: req.body.dataRegistro,
      status: req.body.status,
      fileURL: fileUrl,
      conteudoLaudo: {
      tipoDenticao: req.body.conteudoLaudo?.tipoDenticao,
      caracteristicasEspecificas: req.body.conteudoLaudo?.caracteristicasEspecificas,
      regiao: req.body.conteudoLaudo?.regiao,
    }
});

    await novoRegistro.save();

    res.status(201).json({ message: 'Laudo criado com sucesso!', registro: novoRegistro });
  } catch (err) {
    console.error('Erro ao criar registro odontológico:', err);
    res.status(500).json({ error: 'Erro ao criar registro odontológico.', details: err.message });
  }
};

const getBancoOdonto = async (req, res) => {
  try {
    const registros = await bancoodonto.find();
    res.status(200).json(registros);
  } catch (err) {
    console.error({ message: 'Erro ao listar os registros odontológicos:', err });
    res.status(500).json({ error: 'Erro ao listar os registros odontológicos.', details: err.message });
  }
};

const getBancoOdontoById = async (req, res) => {
  const { id } = req.params;

  if (!id || id.trim() === "") {
    return res.status(400).json({ message: 'ID não fornecido na URL da requisição.' });
  }

  try {
    const registro = await bancoodonto.findById(id);
    if (registro) {
      res.status(200).json(registro);
    } else {
      res.status(404).json({ message: `Não foi encontrado nenhum registro odontológico com essa id=${id}.` });
    }
  } catch (err) {
    console.error({ message: 'Erro ao buscar registro odontológico:', err });
    res.status(500).json({ error: 'Erro ao buscar registro odontológico.', details: err.message });
  }
};

const updateBancoOdonto = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const fileUrl = req.file ? req.file.path : req.body.fileUrl;

    const updateData = {
      tipodoregistro: req.body.tipodoregistro,
      caracteristica: req.body.caracteristica,
      dataRegistro: req.body.dataRegistro,
      status: req.body.status,
      fileURL: fileUrl,
      conteudoLaudo: {
        tipoDenticao: req.body.conteudoLaudo?.tipoDenticao,
        caracteristicasEspecificas: req.body.conteudoLaudo?.caracteristicasEspecificas,
        regiao: req.body.conteudoLaudo?.regiao,
        
      }
    };

    const registroAtualizado = await bancoodonto.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!registroAtualizado) {
      return res.status(400).json({ message: `Não foi encontrado nenhum registro odontológico com essa id=${id}.` });
    }

    res.status(200).json({
      message: 'Registro odontológico atualizado com sucesso!',
      registro: registroAtualizado
    });
  } catch (err) {
    console.error('Erro ao atualizar registro odontológico:', err);
    res.status(500).json({ error: 'Erro ao atualizar registro odontológico.', details: err.message });
  }
};

const deleteBancoOdontoById = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await bancoodonto.deleteOne({ _id: id });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: `Nenhum registro odontológico encontrado com essa id=${id}.` });
    }
    res.status(200).json({ message: `Registro odontológico com ID=${id} foi deletado com sucesso!` });
  } catch (err) {
    console.error('Erro ao deletar registro odontológico:', err);
    res.status(500).json({ message: 'Erro ao deletar registro odontológico.', details: err.message });
  }
};

const deleteBancoOdonto = async (req, res) => {
  try {
    const resultado = await bancoodonto.deleteMany();
    res.status(200).json({
      message: 'Todos os registros odontológicos foram deletados com sucesso!',
      deletedCount: resultado.deletedCount
    });
  } catch (err) {
    console.error('Erro ao deletar todos os registros odontológicos:', err);
    res.status(500).json({ error: 'Erro ao deletar todos os registros odontológicos.', details: err.message });
  }
};

module.exports = {
  createBancoOdonto,
  getBancoOdonto,
  getBancoOdontoById,
  updateBancoOdonto,
  deleteBancoOdontoById,
  deleteBancoOdonto
};
