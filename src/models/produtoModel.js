const { sql, getConnection } = require("../config/db");

const produtoModel = {
    buscarTodos: async () => {
        try {

            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let sql = 'SELECT * FROM Produtos';

            const result = await pool.request().query(sql);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error; // Passa o erro para o controler tratar
        }
    },

    inserirProduto: async (nomeProduto, precoProduto) => {
        try {

            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let querySQL = 'INSERT INTO Produtos(nomeProduto, precoProduto) VALUES(@nomeProduto, @precoProduto)';

            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto) //Criar o nome do input, o tipo dela e o nomeProduto que foi recebido como parâmetro da função
                .input('precoProduto', sql.Char(14), precoProduto) // Não tem problema em colocar o .input na linha de baixo
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir cliente: ', error);
            throw error; // Passa o erro para o controler tratar
        }
    }
}

module.exports = { produtoModel }