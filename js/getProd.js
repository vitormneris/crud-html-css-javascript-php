var resultado = document.getElementById('resposta');

function limpar() {
    document.getElementById("nomeProd").value = ''; 
    document.getElementById("precoProd").value = ''; 
    document.getElementById("quantProd").value = ''; 
    animarErr();
}

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

function getProduto() {
    const produtoId = document.getElementById("getProdutoId").value;
    fetch('/backend/produtos.php?id=' + produtoId, {
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
            resultado.innerHTML = '<p>Produto não encontrado</p>';
            limpar();
        }else{
            document.getElementById("nomeProd").value = data.produto.nome; 
            document.getElementById("precoProd").value = data.produto.preco; 
            document.getElementById("quantProd").value = data.produto.quantidade;
            resultado.innerHTML = '<p>Produto encontrado</p>';
            animarSuc();
        } 
    })
    .catch(limpar(), resultado.innerHTML = '<p>Produto não encontrado</p>');
}