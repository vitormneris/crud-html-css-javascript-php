import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('buscarID').addEventListener('click', getUser)

function getUser() {
    const userId = document.getElementById("usuarioId").value
    fetch('/backend/routes/usuarios.php?id=' + userId, {
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
        if(!data.status){
            animarErr('Usuário não encontrado')
            limpar()
        } else {
            const usuario = data.data
            document.getElementById("nome").value = usuario.nome 
            document.getElementById("email").value = usuario.email 
            document.getElementById("senha").value = usuario.senha
            document.getElementById('cep').value = usuario.cep
            document.getElementById('rua').value = usuario.rua
            document.getElementById('bairro').value = usuario.bairro
            document.getElementById('cidade').value = usuario.cidade
            document.getElementById('uf').value = usuario.uf
            mostrarMapa(usuario.cep)
            animarSuc('Usuário encontrado')
        } 
    })
    .catch(error => animarErr('Erro inesperado na requisição'))
}

function limpar() {
    document.getElementById("nome").value = '' 
    document.getElementById("email").value = '' 
    document.getElementById("senha").value = ''
    document.getElementById('cep').value = ''
    document.getElementById('rua').value = ''
    document.getElementById('bairro').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('uf').value = ''
}
