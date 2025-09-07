import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('excID').addEventListener('click', deleteUser)

function deleteUser() {
    const userId = document.getElementById("usuarioId").value
    fetch('/backend/routes/usuarios.php?id=' + userId, {
        method: 'DELETE'
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
            animarErr('Não foi possível deletar')
        } else {
            document.getElementById("nome").value = ("")
            document.getElementById("email").value = ("")
            document.getElementById("senha").value = ("")
            document.getElementById('cep').value = ("")
            document.getElementById('rua').value = ("")
            document.getElementById('bairro').value = ("")
            document.getElementById('cidade').value = ("")
            document.getElementById('uf').value = ("")
            animarSuc('Usuário deletado')
        }
    })
    .catch(error => animarErr('Erro inesperado na requisição'))
}
