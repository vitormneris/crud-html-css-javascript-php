import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('getAllButton').addEventListener('click', getAllUser)

function getAllUser() {
    fetch('/backend/routes/usuarios.php', {
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
            displayUsers(data.data)
        } else {
            animarErr('Não há usuários cadastrados')
        }
    })
    .catch(error => animarErr('Erro inesperado na requisição'))
}

function displayUsers(data) {
    const div = document.getElementById('usersList')
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
        p.textContent = `E-mail: ${data[i]['email']}`
        container.appendChild(p)

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Senha: ${data[i]['senha']}`
        container.appendChild(p)

        wrapper_container.appendChild(container)
        container = document.createElement('div')
        container.className = 'card'

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `CEP: ${data[i]['cep']}`
        container.appendChild(p)

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Estado: ${data[i]['uf']}`
        container.appendChild(p)

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Cidade: ${data[i]['cidade']}`
        container.appendChild(p)

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Bairro: ${data[i]['bairro']}`
        container.appendChild(p);

        p = document.createElement('p')
        p.className = "field"
        p.textContent = `Rua: ${data[i]['rua']}`
        container.appendChild(p);

        wrapper_container.appendChild(container)
        div.appendChild(wrapper_container)
    }
    animarSuc('Usuários listados')
}
