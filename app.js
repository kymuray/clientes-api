
const express = require('express');
const app = express();

const clienteRoutes = require('./src/routes/clienteRoutes');

const PORT = process.env.PORT || 3000;

// Permite receber dados no formato JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Clientes funcionando!'
    });
});

// Rotas dos clientes
app.use('/clientes', clienteRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
