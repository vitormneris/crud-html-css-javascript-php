import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('submitButton').addEventListener('click', createUser)

function createUser() {
    const nomeUsuario = document.getElementById('nome').value
    const emailUsuario = document.getElementById('email').value
    const senhaUsuario = document.getElementById('senha').value
    const cepUsuario = document.getElementById('cep').value
    const ruaUsuario = document.getElementById('rua').value
    const bairroUsuario = document.getElementById('bairro').value
    const cidadeUsuario = document.getElementById('cidade').value
    const ufUsuario = document.getElementById('uf').value

    if (!nomeUsuario || !emailUsuario || !senhaUsuario ||
         !cepUsuario || !ruaUsuario || !bairroUsuario || !cidadeUsuario || !ufUsuario) {
        animarErr('Por favor, preencha todos os campos!')
        return
    }

    const usuario = {
        nome: nomeUsuario,
        email: emailUsuario,
        senha: senhaUsuario,
        cep: cepUsuario, 
        rua: ruaUsuario,
        bairro: bairroUsuario, 
        cidade: cidadeUsuario,
        uf: ufUsuario
    }

    fetch('/backend/usuarios.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
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
            animarErr('Usuário já existe')
        }
        else {
            animarSuc('Usuário criado')
            document.getElementById('nome').value = ""
            document.getElementById('email').value = ""
            document.getElementById('senha').value = ""
            document.getElementById('cep').value = ""
            document.getElementById('rua').value = ""
            document.getElementById('bairro').value = ""
            document.getElementById('cidade').value = ""
            document.getElementById('uf').value = ""
        } 
    })
    .catch(error => animarErr('Erro na requisição'))
}
