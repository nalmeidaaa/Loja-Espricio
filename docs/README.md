## API Reference 

### Produtos

#### GET /produtos
- **Descrição**: Obtém uma lista de produtos. Se colocar um idProduto no query params, aparecerá apenas o produto especificado
- **Response**: Array de produtos

#### POST /produtos
- **Descrição**: Cria um novo produto
- **Body**:
```
{
    "nomeProduto": "produtoExemplo",
    "precoProduto": 0.00
}
```
- **Response**:
```
{
    "message": "Produto cadastrado com sucesso!"
}
```

### Clientes

#### GET /clientes
- **Descrição**: Obtém uma lista de clientes
- **Response**: Array de clientes

#### POST /clientes
- **Descrição**: Cria um novo clientes
- **Body**:
```
{
    "nomeCliente": "Teste",
    "cpfCliente": "000.000.000-00"
}
```
- **Response**:
```
{
    "message": "Cliente cadastrado com sucesso!"
}
```