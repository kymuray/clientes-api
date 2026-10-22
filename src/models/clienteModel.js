
const db = require('../config/firebase');

const clientesRef = db.ref('clientes');

async function listar() {
    const snapshot = await clientesRef.once('value');
    const dados = snapshot.val();

    if (!dados) {
        return [];
    }

    return Object.entries(dados).map(([id, cliente]) => ({
        id,
        ...cliente
    }));
}

async function buscarPorId(id) {
    const snapshot = await clientesRef.child(String(id)).once('value');

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.key,
        ...snapshot.val()
    };
}

async function criar(dados) {
    const novoClienteRef = clientesRef.push();

    const cliente = {
        nome: dados.nome,
        email: dados.email
    };

    await novoClienteRef.set(cliente);

    return {
        id: novoClienteRef.key,
        ...cliente
    };
}

async function atualizar(id, dados) {
    const clienteRef = clientesRef.child(String(id));
    const snapshot = await clienteRef.once('value');

    if (!snapshot.exists()) {
        return null;
    }

    const cliente = {
        nome: dados.nome,
        email: dados.email
    };

    await clienteRef.update(cliente);

    return {
        id: String(id),
        ...cliente
    };
}

async function excluir(id) {
    const clienteRef = clientesRef.child(String(id));
    const snapshot = await clienteRef.once('value');

    if (!snapshot.exists()) {
        return false;
    }

    await clienteRef.remove();

    return true;
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};
