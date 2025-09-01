import { animarErr, animarSuc } from "../../js/anim.js"

document.getElementById('excID').addEventListener('click', deleteProduto)

function deleteProduto() {
    const produtoId = document.getElementById("produtoId").value
    fetch('/backend/produtos.php?id=' + produtoId, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                animarErr('Não autorizado')
            } 
            else {
                animarErr('Sem rede ou não conseguiu localizar o recurso')
            }
        }
        return response.json()
    })
    .then(data => {
        if(!data.status){
            animarErr('Não pode Deletar')    
        }
        else {
            animarSuc('Produto deletado')
            
            document.getElementById("nome").value = '' 
            document.getElementById("preco").value = '' 
            document.getElementById("quant").value = ''         
        } 
    })
    .catch(error => console.log(error))
}