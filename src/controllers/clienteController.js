const { clienteModel } = require("../models/clienteModel");
const { sql, getConnection } = require("../config/db");
const { rows } = require("mssql");

const clienteController = {
    // ---------------------
    // LISTAR TODOS OS CLIENTES
    // GET /clientes
    // ---------------------

    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ message: 'Erro ao buscar clients.' });
        }
    },

    // ---------------------
    // CRIAR UM NOVO CLIENTE
    // POST /clientes
    /*
        {
            "nomeCliente": "valor",
            "cpfCliente": "000.000.000-00"
        }
    */
    // ---------------------  
    criarCliente: async (req, res) => {
        try {
            //verificar se o CPF informado já está inserido e retornar uma mensagem de status 409 caso já exista)

            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || cpfCliente == undefined) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos!' });
            }

            const result = await clienteModel.buscarCPF (cpfCliente);
            if (result.length > 0) {
                return res.status(409).json({ message: 'CPF já cadastrado.' });
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });

        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ message: 'Erro no servidor ao cadastrar cliente.' });
        }
    }
}

module.exports = { clienteController };