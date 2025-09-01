import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('buscarID').addEventListener('click', getUser)

function getUser() {
    const userId = document.getElementById("getUserId").value
    fetch('/backend/usuarios.php?id=' + userId, {
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
        }else{
            document.getElementById("nome").value = data.usuario.nome 
            document.getElementById("email").value = data.usuario.email 
            document.getElementById("senha").value = data.usuario.senha
            document.getElementById('cep').value = data.endereco.cep
            document.getElementById('rua').value = data.endereco.rua
            document.getElementById('bairro').value = data.endereco.bairro
            document.getElementById('cidade').value = data.endereco.cidade
            document.getElementById('uf').value = data.endereco.uf
            animarSuc('Usuário encontrado')
            mostrarMapa(data.endereco.cep)
            
        } 
    })
    .catch(error => console.log(error))
}

function limpar() {
    document.getElementById("nome").value = '' 
    document.getElementById("email").value = '' 
    document.getElementById("senha").value = ''
}
