const mongoose = require('mongoose');

const bancoodontoSchema = new mongoose.Schema({
    // Tipo do registro: ante-mortem ou post-mortem
    tipodoregistro: {
        type: String,
        enum: ['ante-mortem', 'post-mortem'],
        required: true
    },

    // Característica geral do paciente
    caracteristica: {
        type: String,
        trim: true,
        required: true
    },
    
    // Data do registro
    dataRegistro: {
        type: Date,
        required: true
    },

    // Status do registro
    status: {
        type: String,
        enum: ['identificado', 'não identificado'],
        default: 'identificado'
    },

    // Conteúdo do laudo agrupando os três campos
    conteudoLaudo: {
        tipoDenticao: {
            type: String,
            enum: ['decídua', 'permanente', 'mista'],
            default: 'mista'
        },

        caracteristicasEspecificas: {
            type: String,
            enum: ['dentes ausentes', 'implante', 'ponte', 'coroa', 'restaurações'],
            default: 'restaurações'
        },

        regiao: {
            type: [String],
            enum: ['anterior', 'posterior', 'maxila', 'mandíbula'],
            default: 'anterior'
        }
    },

    // URL do arquivo relacionado ao registro
    fileURL: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const validExtensions = /\.(jpg|jpeg|png|gif|pdf|mp4|avi|mov|mkv|webm)$/i;
                const isHttpUrl = /^https?:\/\/.+/i.test(value);
                const hasValidExtension = validExtensions.test(value);
                const isRawUpload = value.includes('/raw/upload/');

                return isHttpUrl && (hasValidExtension || isRawUpload);
            },
            message: props => `${props.value} não é uma URL válida com extensão permitida (.jpg, .png, .gif, .pdf, .mp4, .mov, etc.)`
        }
    }

}, { timestamps: true });

const Bancoodonto = mongoose.model('Bancoodonto', bancoodontoSchema);
module.exports = Bancoodonto;
