document.getElementById('submitButton').addEventListener('click', createUser);
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

function createUser() {
    const nomeUsuario = document.getElementById('nome').value;
    const emailUsuario = document.getElementById('email').value;
    const senhaUsuario = document.getElementById('senha').value;
    const cepUsuario = document.getElementById('cep').value;
    const ruaUsuario = document.getElementById('rua').value;
    const bairroUsuario = document.getElementById('bairro').value;
    const cidadeUsuario = document.getElementById('cidade').value;
    const ufUsuario = document.getElementById('uf').value;

    if (!nomeUsuario || !emailUsuario || !senhaUsuario ||
         !cepUsuario || !ruaUsuario || !bairroUsuario || !cidadeUsuario || !ufUsuario) {
        resultado.innerHTML = 'Por favor, preencha todos os campos!';
        animarErr();
        return;
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
    };

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
            resultado.innerHTML = '<p>Usuário já existe</p>';
            animarErr();
        }else{
            resultado.innerHTML = '<p>Usuário criado</p>';
            animarSuc();
            document.getElementById('nome').value = "";
            document.getElementById('email').value = "";
            document.getElementById('senha').value = "";
            document.getElementById('cep').value = "";
            document.getElementById('rua').value = "";
            document.getElementById('bairro').value = "";
            document.getElementById('cidade').value = "";
            document.getElementById('uf').value = "";
        } 
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}
