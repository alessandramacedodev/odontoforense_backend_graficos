const mongoose = require('mongoose');

const laudoSchema = new mongoose.Schema({
    tituloLaudo: {
        type: String,
        required: true,
        trim: true
    },
    numeroLaudo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dataEmissao: {
        type: Date,
        required: true
    },
    tipoLaudo: {
        type: String,
        enum: ['preliminar', 'final', 'complementar'],
        required: true
    },

    conteudoLaudo: {
        type: new mongoose.Schema({
            introducao: {
                type: String,
                required: true
            },
            metodologia: {
                type: String,
                required: true
            },
            analiseeResultados: {
                type: String,
                required: true
            },
            conclusao: {
                type: String,
                required: true
            }
        }, { _id: false })  
    }
});


const Laudo = mongoose.model ('Laudo', laudoSchema);
module.exports = Laudo


