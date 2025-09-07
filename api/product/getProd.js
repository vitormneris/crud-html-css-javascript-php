import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('buscarID').addEventListener('click', getProduto)

function getProduto() {
    const produtoId = document.getElementById("produtoId").value
    fetch('/backend/routes/produtos.php?id=' + produtoId, {
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
        if (!data.status) {
            animarErr('Produto não encontrado')
            limpar()
        } else {
            document.getElementById("nome").value = data.data.nome 
            document.getElementById("preco").value = data.data.preco 
            document.getElementById("quant").value = data.data.quantidade
            animarSuc('Produto encontrado')
        } 
    })
    .catch(error => animarErr('Erro inesperado na requisição'))
}

function limpar() {
    document.getElementById("nome").value = '' 
    document.getElementById("preco").value = '' 
    document.getElementById("quant").value = ''
}