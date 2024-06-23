document.getElementById('getAllButton').addEventListener('click', getAllProd);
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

function getAllProd() {
    fetch('/backend/produtos.php', {
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
        displayProdutos(data);
    })
    .catch(error => animarErr(), resultado.innerHTML = '<p>Erro na requisição</p>');
}

function displayProdutos(data) {
    const produtos = data.produtos;  
    const produtosDiv = document.getElementById('produtosList');
    produtosDiv.innerHTML = ''; 

    const list = document.createElement('ul');

    produtos.forEach(produto => {
        const listItem = document.createElement('li');
        const listItem1 = document.createElement('li');
        const listItem2= document.createElement('li');
        const listItem3 = document.createElement('li');
        const pula = document.createElement('br');

        listItem.textContent = `ID: ${produto.id}`;
        list.appendChild(listItem);

        listItem1.textContent = `Nome: ${produto.nome}`;
        list.appendChild(listItem1);

        listItem2.textContent = `Preço: R$ ${produto.preco}`;
        list.appendChild(listItem2);

        listItem3.textContent = `Quantidade: ${produto.quantidade}`;
        list.appendChild(listItem3);

        list.appendChild(pula);
    });
    produtosDiv.appendChild(list);
    resultado.innerHTML = '<p>Produtos listados</p>';
    animarSuc();
}
