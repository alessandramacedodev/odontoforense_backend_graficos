const multer = require('multer');
const path = require('path');
const { storage } = require('../utils/cloudinary');

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|pdf/
    
    // Verifica a extensão do arquivo
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    
    // Verifica o mimetype do arquivo
    const mimetype = allowedTypes.test(file.mimetype)
    
    // Se ambos forem verdadeiros (extensão e mimetype), aceita o arquivo
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      // Caso contrário, retorna erro
      cb(new Error('Arquivo inválido! Apenas imagens, vídeos e PDFs são permitidos'))
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 } // Limite de 50MB
})

module.exports = upload;