import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('submitButton').addEventListener('click', createProduto)

function createProduto() {
    const nomeProduto = document.getElementById("nome").value
    const precoProduto = document.getElementById("preco").value
    const quantProduto = document.getElementById("quant").value

    if (!nomeProduto || !precoProduto || !quantProduto) {
        animarErr('Por favor, preencha todos os campos!')
        return
    }

    const produto = {
        nome: nomeProduto,
        preco: precoProduto,
        quantidade: quantProduto
    }

    fetch('/backend/produtos.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
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
            animarErr('Produto já existe')   
        }
        else {
            animarSuc('Produto criado')
            document.getElementById('nome').value = ""
            document.getElementById('preco').value = ""
            document.getElementById('quant').value = ""
        }  
    })
    .catch(error => console.log(error))
}
