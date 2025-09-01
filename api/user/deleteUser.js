import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('excID').addEventListener('click', deleteUser)

function deleteUser() {
    const userId = document.getElementById("getUserId").value
    fetch('/backend/usuarios.php?id=' + userId, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                if (response.status0 === 401 || response.status1 === 401) {
                    animarErr('Não autorizado')
                } else {
                    animarErr('Sem rede ou não conseguiu localizar o recurso')
                }
            }
            return response.json()
        })
        .then(data => {
            if (!(data.status0 && data.status1)) {
                animarErr('Não foi possível deletar')
            } else {
                resultado.innerHTML = 
                animarSuc('Usuário deletado')
                document.getElementById("nome").value = ("")
                document.getElementById("email").value = ("")
                document.getElementById("senha").value = ("")
                document.getElementById('cep').value = ("")
                document.getElementById('rua').value = ("")
                document.getElementById('bairro').value = ("")
                document.getElementById('cidade').value = ("")
                document.getElementById('uf').value = ("")
            }
        })
        .catch(error => console.log(error))
}
