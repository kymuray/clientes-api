
const { initializeApp, cert } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const fs = require('fs');
const path = require('path');

const caminhoRender = '/etc/secrets/serviceAccountKey.json';

const caminhoChave = fs.existsSync(caminhoRender)
    ? caminhoRender
    : path.join(__dirname, '../../serviceAccountKey.json');

const serviceAccount = require(caminhoChave);

initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://clientes-api-1209-default-rtdb.firebaseio.com/'
});

const db = getDatabase();

module.exports = db;
