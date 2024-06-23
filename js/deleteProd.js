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

function deleteProduto() {
    const produtoId = document.getElementById("getProdutoId").value;
    fetch('/backend/produtos.php?id=' + produtoId, {
        method: 'DELETE'
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
            resultado.innerHTML = '<p>Não pode Deletar</p>';
            animarErr();
        }else{
            resultado.innerHTML = '<p>Produto deletado</p>';
            animarSuc();
            document.getElementById("nomeProd").value = ''; 
            document.getElementById("precoProd").value = ''; 
            document.getElementById("quantProd").value = '';         
        } 
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}