import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('attID').addEventListener('click', updateProduto)

function updateProduto() {
    const produtoId = document.getElementById("produtoId").value
    const nomeProduto = document.getElementById("nome").value
    const precoProduto = document.getElementById("preco").value
    const quantProduto = document.getElementById("quant").value

    const produtoAtualizado = {
        nome: nomeProduto,
        preco: precoProduto,
        quantidade: quantProduto
    }

    fetch('/backend/routes/produtos.php?id=' + produtoId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
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
                animarErr('Não foi possível atualizar')
            } else {
                animarSuc('Produto atualizado')
            }
        })
    .catch(error => animarErr('Erro inesperado na requisição'))
}
