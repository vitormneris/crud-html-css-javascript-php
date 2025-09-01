import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('getAllButton').addEventListener('click', getAllUser)

function getAllUser() {
    fetch('/backend/usuarios.php', {
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
        displayUsers(data)
    })
    .catch(error => console.log(error))
}

function displayUsers(data) {
    const users = data.usuarios
    const ends = data.enderecos

    const usersDiv = document.getElementById('usersList')
    usersDiv.innerHTML = '' 

    const list = document.createElement('ul')

    for (let i = 0 ; i < users.length ; i = i + 1) {
        const pula = document.createElement('br')

        const listItemUser0 = document.createElement('li')
        listItemUser0.textContent = `ID: ${users[i]['id']}`
        list.appendChild(listItemUser0)
        const listItemUser1 = document.createElement('li')
        listItemUser1.textContent = `Nome: ${users[i]['nome']}`
        list.appendChild(listItemUser1)
        const listItemUser2 = document.createElement('li')
        listItemUser2.textContent = `E-mail: ${users[i]['email']}`
        list.appendChild(listItemUser2)
        const listItemUser3 = document.createElement('li')
        listItemUser3.textContent = `Senha: ${users[i]['senha']}`
        list.appendChild(listItemUser3)

        const listItemEnd0 = document.createElement('li')
        listItemEnd0.textContent = `CEP: ${ends[i]['cep']}`
        list.appendChild(listItemEnd0)
        const listItemEnd1 = document.createElement('li')
        listItemEnd1.textContent = `Rua: ${ends[i]['rua']}`
        list.appendChild(listItemEnd1)
        const listItemEnd2 = document.createElement('li')
        listItemEnd2.textContent = `Bairro: ${ends[i]['bairro']}`
        list.appendChild(listItemEnd2)
        const listItemEnd3 = document.createElement('li')
        listItemEnd3.textContent = `Cidade: ${ends[i]['cidade']}`
        list.appendChild(listItemEnd3)
        const listItemEnd4 = document.createElement('li')
        listItemEnd4.textContent = `UF: ${ends[i]['uf']}`
        list.appendChild(listItemEnd4)
        
        list.appendChild(pula)
    }
    usersDiv.appendChild(list)
    animarSuc('Usuários listados')
}
