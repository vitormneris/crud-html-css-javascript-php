import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('buscarID').addEventListener('click', getProduto)

function getProduto() {
    const produtoId = document.getElementById("produtoId").value
    fetch('/backend/produtos.php?id=' + produtoId, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                animarErr('Não autorizado')
            } else {
                animarErr('Sem rede ou não conseguiu localizar o recurso')
            }
        }
        return response.json()
    })
    .then(data => {
        if(!data.status){
            animarErr('Produto não encontrado')
            limpar()
        }else{
            document.getElementById("nome").value = data.produto.nome 
            document.getElementById("preco").value = data.produto.preco 
            document.getElementById("quant").value = data.produto.quantidade
            animarSuc('Produto encontrado')
        } 
    })
    .catch(error => console.log(error))
}

function limpar() {
    document.getElementById("nome").value = '' 
    document.getElementById("email").value = '' 
    document.getElementById("senha").value = ''
}