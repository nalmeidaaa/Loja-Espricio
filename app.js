const express = require('express'); //Serve para importar os requirimentos 
const app = express(); //Serve para criar uma instância do express 
const { } = require("./src/routes/produtoRoutes");
const { } = require("./src/routes/clienteRoutes");

const {produtoRoutes} = require('./src/routes/produtoRoutes');
const {clienteRoutes} = require('./src/routes/clienteRoutes');

const PORT = 8081; //Serve para inserir uma porta 

app.use(express.json());

app.use('/', clienteRoutes)
app.use('/', produtoRoutes)
app.listen(PORT, () => {
    console.log(`Servior rodando em https://localhost:${PORT}`);
})