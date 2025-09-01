import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('getAllButton').addEventListener('click', getAllProd)

function getAllProd() {
    fetch('/backend/produtos.php', {
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
        displayProdutos(data)
    })
    .catch(error => console.log(error))
}

function displayProdutos(data) {
    const produtos = data.produtos  
    const produtosDiv = document.getElementById('produtosList')
    produtosDiv.innerHTML = '' 

    const list = document.createElement('ul')

    produtos.forEach(produto => {
        const listItem = document.createElement('li')
        const listItem1 = document.createElement('li')
        const listItem2= document.createElement('li')
        const listItem3 = document.createElement('li')
        const pula = document.createElement('br')

        listItem.textContent = `ID: ${produto.id}`
        list.appendChild(listItem)

        listItem1.textContent = `Nome: ${produto.nome}`
        list.appendChild(listItem1)

        listItem2.textContent = `Preço: R$ ${produto.preco}`
        list.appendChild(listItem2)

        listItem3.textContent = `Quantidade: ${produto.quantidade}`
        list.appendChild(listItem3)

        list.appendChild(pula)
    })
    produtosDiv.appendChild(list)
    animarSuc('Produtos listados')
}
