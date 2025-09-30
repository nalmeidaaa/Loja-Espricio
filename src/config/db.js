const sql = require("mssql");

// Criar constante de configurações
const config = {
    user: 'sa',
    password: '123456789',
    server: 'localhost',
    database: 'LojaDB',
    // Opções de conexões abaixo que devem ser dentro de chaves
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection() {// Função assíncrona - Que acontece simultâneamente
    try {

        const pool = await sql.connect(config);
        return pool;

    } catch (error) {
        console.error('Erro na conexão do SQL Server:', error);
    }
}

module.exports = {sql, getConnection};