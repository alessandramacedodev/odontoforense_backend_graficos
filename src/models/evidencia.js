const mongoose = require('mongoose');

const evidenciaSchema = new mongoose.Schema({
    // Nome da evidência
    nome_evidencia: {
        type: String,
        required: true,
        trim: true
    },

    // Categoria da evidência
    categoria: {
        type: String,
        enum: ['odontologica', 'documentos', 'fotografias', 'laboratorial', 'outros'],
        default: 'odontologica'
    },

    // Data da coleta
    data_coleta: {
        type: Date,
        required: true
    },

    // Descrição da evidência
    descricao: {
        type: String,
        trim: true
    },

    // Local de retirada da evidência
    local_retirada: {
        type: String,
        enum: ['agencia', 'laboratório', 'delegacia'],
        default: 'delegacia'
    },

    // URL do arquivo da evidência
    fileUrl: {
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
    },

    // Usuário que coletou a evidência
    coletadoPor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario',
        required: true
    },

    // Caso relacionado à evidência
    caso: {
        type: mongoose.Schema.ObjectId,
        ref: 'Caso',
        required: true
    }

}, { timestamps: true });

const Evidencia = mongoose.model('Evidencia', evidenciaSchema);
module.exports = Evidencia
