import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('attID').addEventListener('click', updateUser)

function updateUser() {
    const userId = document.getElementById("usuarioId").value
    const userName = document.getElementById("nome").value
    const userEmail = document.getElementById("email").value
    const userSenha = document.getElementById("senha").value
    const cepUsuario = document.getElementById('cep').value
    const ruaUsuario = document.getElementById('rua').value
    const bairroUsuario = document.getElementById('bairro').value
    const cidadeUsuario = document.getElementById('cidade').value
    const ufUsuario = document.getElementById('uf').value

    const usuarioAtualizado = {
        nome: userName,
        email: userEmail,
        senha: userSenha,
        cep: cepUsuario,
        rua: ruaUsuario,
        bairro: bairroUsuario,
        cidade: cidadeUsuario,
        uf: ufUsuario,
    }

    fetch('/backend/routes/usuarios.php?id=' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAtualizado)
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
                animarSuc('Usuário atualizado')
            }
        })
        .catch(error => animarErr('Erro inesperado na requisição'))
}
