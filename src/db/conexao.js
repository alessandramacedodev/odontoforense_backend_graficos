const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Conexão feita com sucesso com o MongoDB');
    } catch (err) {
        console.log('Error de conexão com o MongoDB', err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
