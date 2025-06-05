const mongoose = require('mongoose')
// Definição do schema do caso (perícia), com informações completas
const casoSchema = new mongoose.Schema({

    // Número do caso 
    numeroDoCaso: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 20
    },

    // Data de abertura do caso
    dataDeAbertura: {
        type: Date,
        default: Date.now
    },

    // Perito responsável 
    peritoResponsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },

    // Status atual do caso
    status: {
        type: String,
        enum: ['em andamento', 'finalizado', 'arquivado'],
        default: 'em andamento'
    },

    // Local do ocorrido
    local: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1000
    },

    // Quem solicitou o caso
    solicitadoPor: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },

    // Descrição do caso
    descricao: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 1000
    },

    // Detalhes adicionais 
    detalhes: {
        type: String,
        trim: true,
        maxlength: 3000
    }

}, {
    timestamps: true 
});

// Criação do modelo 'Caso'
const Caso = mongoose.model('Caso', casoSchema);

// Exporta o modelo para uso em outras partes do sistema
module.exports = Caso
