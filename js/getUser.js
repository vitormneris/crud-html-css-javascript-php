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
    setTimeout(function() {
        resultado.style.transition = '1s';
        resultado.style.background = 'rgba(0, 0, 0, 0.2)'; 
    }, 2000);
}

function limpar() {
    document.getElementById("inpuNome").value = ''; 
    document.getElementById("inpuEmail").value = ''; 
    document.getElementById("inpuSenha").value = '';
    animarErr(); 
}


function getUser() {
    const userId = document.getElementById("getUserId").value;
    fetch('/backend/usuarios.php?id=' + userId, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
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
        if(!data.status){
            resultado.innerHTML = '<p>Usuário não encontrado</p>';
            limpar();
        }else{
            document.getElementById("inpuNome").value = data.usuario.nome; 
            document.getElementById("inpuEmail").value = data.usuario.email; 
            document.getElementById("inpuSenha").value = data.usuario.senha;
            document.getElementById('cep').value = data.endereco.cep;
            document.getElementById('rua').value = data.endereco.rua;
            document.getElementById('bairro').value = data.endereco.bairro;
            document.getElementById('cidade').value = data.endereco.cidade;
            document.getElementById('uf').value = data.endereco.uf;
            resultado.innerHTML = '<p>Usuário encontrado</p>';
            mostrarMapa(data.endereco.cep);
            animarSuc();
        } 
    })
    .catch(error => limpar(), resultado.innerHTML = '<p>Usuário não encontrado</p>');
}