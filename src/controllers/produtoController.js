const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    // ---------------------
    // LISTAR TODOS OS PRODUTOS
    // GET /produtos
    // ---------------------

    listarProdutos: async (req, res) => {
        try {
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos.' });
        }
    },

    // ---------------------
    // CRIAR TODOS OS PRODUTOS
    // POST /produtos
    /* 
        {
            "nomeProduto": "valor"
            "precoProduto": "0.00"
        }
    */
    // ---------------------

    criarProduto: async (req, res) => {
        try {
            const { nomeProduto, precoProduto } = req.body;

            if (nomeProduto == undefined || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: 'Campos obrigatórios não preenchidos' });

            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);
            res.status(201).json({ message: 'Produto cadastrado com sucesso' });

        } catch (error) {
            console.error('Erro ao cadastrar produto', error);
            res.status(500).json({ erro: 'Erro no servidor ao cadatrar produto' });
        }
    },

    // ---------------------
    // ATUALIZAR UM PRODUTO
    // PUT /produtos/:idProduto
    // nomeProduto e precoProduto são opcionais
    /*
        {
            "nomeProduto": "valor",
            "precoProduto": "0.00"
        }
    */
    // ---------------------

    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const { nomeProduto, precoProduto } = req.body;

            if (idProduto.length != 36) {
                return res.status(400).json({ erro: 'id do produto inválido' });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) { //Se produto não for válido, ou se tiver mais de um,
                return res.status(404).json({ erro: 'Produto não encontrado!' })
            }

            const produtoAtual = produto[0]

            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto; // Se o nomeProduto for desconhecido, nome Atualizado será o nome do produto atual
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

            res.status(200).json({ message: 'Produto atualizado com sucesso!' });

        } catch (error) {
            console.error('Erro ao atualizar produto', error);
            res.status(500).json({ erro: 'Erro no servidor ao atualizar produto' });
        }
    },
    // ---------------------
    // DELETAR UM PRODUTO
    // PUT /produtos/:idProduto
    // ---------------------

    deletarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            if (idProduto.length != 36) { // Verifica se o idProduto tem 36 caracteres 
                return res.status(400).json({ erro: 'id do produto inválido' });
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !== 1) { //Se produto não for válido, ou se tiver mais de um,
                return res.status(404).json({ erro: 'Produto não encontrado!' })
            }

            await produtoModel.deletarProduto(idProduto)

            res.status(200).json({ message: 'Produto deletado com sucesso!' });

        } catch (error) {
            console.error('Erro ao deletar produto', error);
            res.status(500).json({ erro: 'Erro no servidor ao deletar produto' });
        }
    }
}

module.exports = { produtoController };