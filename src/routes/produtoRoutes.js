const express = require("express");
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

// GET /produtos -> Lista todos os produtos. Se colocar um idProduto no query params, aparecerá apenas o produto especificado
router.get("/produtos", produtoController.listarProdutos);

// POST /produtos -> Cria um novo produto
router.post("/produtos", produtoController.criarProduto);

// PUT /produtos/idProduto -> Atualizar um produto
router.put("/produtos/:idProduto", produtoController.atualizarProduto)

// DELETE /produtos/idProduto -> Deletar um produto
router.delete("/produtos/:idProduto", produtoController.deletarProduto)

module.exports = { produtoRoutes: router }