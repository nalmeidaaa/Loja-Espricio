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

    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            const querySQL = 'SELECT * FROM Produtos WHERE idProduto = @idProduto';

            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar o produto: ', error);
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
    },

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto
            `
            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .input('nomeProduto', sql.VarChar(100), nomeProduto) //Criar o nome do input, o tipo dela e o nomeProduto que foi recebido como parâmetro da função
                .input('precoProduto', sql.Char(14), precoProduto) // Não tem problema em colocar o .input na linha de baixo
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao atualizar produto: ', error);
            throw error; // Passa o erro para o controler tratar
        }
    },
    deletarProduto: async (idProduto) => {
        try {
            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            const querySQL = 'DELETE FROM Produtos WHERE idProduto=@idProduto'

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao deletar produto: ', error);
            throw error; // Passa o erro para o controler tratar
        }
    }
}

module.exports = { produtoModel }