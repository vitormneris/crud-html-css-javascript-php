import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('getAllButton').addEventListener('click', getAllProd)

function getAllProd() {
    fetch('/backend/routes/produtos.php', {
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
        if (data.status) {
            displayProdutos(data.data)
        } else {
            animarErr('Não há produtos cadastrados')
        }
    })
    .catch(error => animarErr('Erro inesperado na requisição'))
}

function displayProdutos(data) {
    const div = document.getElementById('produtosList')
    div.innerHTML = ''
    for (let i = 0; i < data.length; i = i + 1) {
        let wrapper_container = document.createElement('div')
        wrapper_container.className = 'wrapper-card'

        let container = document.createElement('div')
        container.className = 'card'

        let p = document.createElement('p')
        p.className = "field"
        p.textContent = `ID: ${data[i]['id']}`
        container.appendChild(p)

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Nome: ${data[i]['nome']}`
        container.appendChild(p)

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Preco: ${data[i]['preco']}`
        container.appendChild(p)

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Quantidade: ${data[i]['quantidade']}`
        container.appendChild(p)

        wrapper_container.appendChild(container)
        div.appendChild(wrapper_container)
    }
    animarSuc('Produtos listados')

}
