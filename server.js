require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/conexao.js');
const {swaggerUi, swaggerSpec } = require('./src/docs/swagger.js')
const usuarioRouter = require('./src/routes/user.route.js');
const casoRouter = require('./src/routes/caso.route.js');
const evidenciaRouter = require('./src/routes/evidencia.route.js');
const laudoRouter = require('./src/routes/laudo.route.js'); 
const bancoodontoRouter = require('./src/routes/bancoodonto.route.js'); 

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))



// Rotas
app.use('/api/user', usuarioRouter);
app.use('/api/caso', casoRouter);
app.use('/api/evidencia', evidenciaRouter);
app.use('/api/laudo', laudoRouter);
app.use('/api/bancoodonto', bancoodontoRouter);

// Início do servidor
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting the server on http://localhost:${PORT}`, error);
        process.exit(1);
    }
}

startServer();
