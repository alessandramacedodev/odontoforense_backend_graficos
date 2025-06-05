const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config()

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      let resourceType = 'image';
  
      if (file.mimetype.startsWith('video/')) {
        resourceType = 'video'
      } else if (file.mimetype === 'application/pdf') {
        resourceType = 'raw'
      }
  
      return {
        folder: 'odontoforense',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'pdf'],
        resource_type: resourceType,
      }
    }
})

module.exports = {storage}