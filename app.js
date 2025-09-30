const express = require('express'); //Serve para importar os requirimentos 
const app = express(); //Serve para criar uma instância do express 
const { } = require("./src/routes/produtoRoutes");
const {produtoRoutes} = require('./src/routes/produtoRoutes');
const PORT = 8081; //Serve para inserir uma porta 

app.use(express.json());

app.use('/', produtoRoutes)
app.listen(PORT, () => {
    console.log(`Servior rodando em https://localhost:${PORT}`);
})