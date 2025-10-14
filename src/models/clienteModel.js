const { sql, getConnection } = require("../config/db");

const clienteModel = {
    buscarTodos: async () => {
        try {

            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let sql = 'SELECT * FROM clientes';

            const result = await pool.request().query(sql);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            throw error; // Passa o erro para o controler tratar
        }
    },

    buscarCPF: async (cpfCliente) => {
        try {

            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            const querySQL = 'SELECT * FROM clientes WHERE cpfCliente = @cpfCliente;';

            const result = await pool.request()
                .input('cpfCliente', sql.Char(14), cpfCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error; // Passa o erro para o controler tratar
        }
    },




    inserirCliente: async (nomeCliente, cpfCliente) => {
        try {

            const pool = await getConnection(); // Cria conexão com o Banco de Dados

            let querySQL = 'INSERT INTO clientes(nomeCliente, cpfCliente) VALUES(@nomeCliente, @cpfCliente)';

            await pool.request()
                .input('nomeCliente', sql.VarChar(100), nomeCliente) //Criar o nome do input, o tipo dela e o nomeCliente que foi recebido como parâmetro da função
                .input('cpfCliente', sql.Char(14), cpfCliente) // Não tem problema em colocar o .input na linha de baixo
                .query(querySQL);

        } catch (error) {
            console.error('Erro ao inserir cliente: ', error);
            throw error; // Passa o erro para o controler tratar
        }
    }
}

module.exports = { clienteModel }