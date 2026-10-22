
const express = require('express');
const cors = require('cors');

const app = express();
const clienteRoutes = require('./src/routes/clienteRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Clientes funcionando!'
    });
});

app.use('/clientes', clienteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
