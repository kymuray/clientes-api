
const Cliente = require('../models/clienteModel');

async function listar(req, res) {
    try {
        res.json(await Cliente.listar());
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao listar clientes.' });
    }
}

async function buscarPorId(req, res) {
    const id = req.params.id;

    try {
        const cliente = await Cliente.buscarPorId(id);

        if (!cliente) {
            return res.status(404).json({
                erro: 'Cliente não encontrado.'
            });
        }

        res.json(cliente);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar cliente.' });
    }
}

async function criar(req, res) {
    const { nome, email } = req.body;

    if (
        typeof nome !== 'string' ||
        !nome.trim() ||
        typeof email !== 'string' ||
        !email.trim()
    ) {
        return res.status(400).json({
            erro: 'Informe o nome e o e-mail do cliente.'
        });
    }

    try {
        const cliente = await Cliente.criar({
            nome: nome.trim(),
            email: email.trim()
        });

        res.status(201).json(cliente);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar cliente.' });
    }
}

async function atualizar(req, res) {
    const id = req.params.id;
    const { nome, email } = req.body;

    if (
        typeof nome !== 'string' ||
        !nome.trim() ||
        typeof email !== 'string' ||
        !email.trim()
    ) {
        return res.status(400).json({
            erro: 'Informe o nome e o e-mail do cliente.'
        });
    }

    try {
        const cliente = await Cliente.atualizar(id, {
            nome: nome.trim(),
            email: email.trim()
        });

        if (!cliente) {
            return res.status(404).json({
                erro: 'Cliente não encontrado.'
            });
        }

        res.json(cliente);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
    }
}

async function excluir(req, res) {
    const id = req.params.id;

    try {
        const excluido = await Cliente.excluir(id);

        if (!excluido) {
            return res.status(404).json({
                erro: 'Cliente não encontrado.'
            });
        }

        res.status(204).send();
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao excluir cliente.' });
    }
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};
