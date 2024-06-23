var resultado = document.getElementById('resposta');

function animarSuc() {
    resultado.style.transition = '1s';
    resultado.style.background = 'rgb(52, 255, 29, 0.7)';
    window.scrollTo(0, 0);
    animar();
}

function animarErr() {
    resultado.style.transition = '1s';
    resultado.style.background = 'rgb(250, 11, 11, 0.7)';
    window.scrollTo(0, 0);
    animar();
}

function animar() {
    setTimeout(function () {
        resultado.style.transition = '1s';
        resultado.style.background = 'rgba(0, 0, 0, 0.2)';
    }, 2000);
}

function deleteUser() {
    const userId = document.getElementById("getUserId").value;
    fetch('/backend/usuarios.php?id=' + userId, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                if (response.status0 === 401 || response.status1 === 401) {
                    resultado.innerHTML = '<p>Não autorizado</p>';
                    animarErr();
                } else {
                    resultado.innerHTML = '<p>Sem rede ou não conseguiu localizar o recurso</p>';
                    animarErr();
                }
            }
            return response.json();
        })
        .then(data => {
            if (!(data.status0 && data.status1)) {
                resultado.innerHTML = '<p>Não pode Deletar</p>';
                animarErr();
            } else {
                resultado.innerHTML = '<p>Usuário deletado</p>';
                animarSuc()
                document.getElementById("inpuNome").value = ("");
                document.getElementById("inpuEmail").value = ("");
                document.getElementById("inpuSenha").value = ("");
                document.getElementById('cep').value = ("");
                document.getElementById('rua').value = ("");
                document.getElementById('bairro').value = ("");
                document.getElementById('cidade').value = ("");
                document.getElementById('uf').value = ("");
            }
        })
        .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}
