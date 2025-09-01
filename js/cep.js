var mapa = L.map('map').setView([0, 0], 2)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mapa)

mapa.scrollWheelZoom.disable()

function buscarLocal(lat, lon) {
    mapa.setView([lat, lon], 15)
    var pontoMarcador = L.marker([lat, lon]).addTo(mapa)
    pontoMarcador.bindPopup('Você está aqui').openPopup()
}

function mostrarMapa(cep) {
    if (!cep) {
        animarErr('<p>CEP não encontrado</p>')
    }

    const chave = 'd2841bef49aa4227aa7780a7731eb608'

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${chave}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const coordenadas = {
                    latitude: data.results[0].geometry.lat,
                    longitude: data.results[0].geometry.lng
                }
                buscarLocal(coordenadas.latitude, coordenadas.longitude)
            } else {
                animarErr('<p>CEP não encontrado</p>')
            }
        })
        .catch(error => animarErr('<p>Erro ao exibir o mapa</p>'))
}

function meuCallback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = (conteudo.logradouro)
        document.getElementById('bairro').value = (conteudo.bairro)
        document.getElementById('cidade').value = (conteudo.localidade)
        document.getElementById('uf').value = (conteudo.uf)
    }
    else {
        modificarFormularioCep()
        animarErr('<p>CEP não encontrado</p>')
    }
}

function pesquisaCep(valor) {
    var cep = valor.replace(/\D/g, '')
    if (cep != "") {
        var validacep = /^[0-9]{8}$/
        if (validacep.test(cep)) {
            mostrarMapa(cep)
            modificarFormularioCep("...")

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            }

            fetch("https://viacep.com.br/ws/" + cep + "/json/", requestOptions)
                .then(response => response.json())
                .then(data => meuCallback(data))
                .catch(error => animarErr('Erro: ', error))
        }
        else {
            animarErr('<p>Formato de CEP inválido</p>')
        }
    }
}

function modificarFormularioCep(text = "") {
    document.getElementById('rua').value = (text)
    document.getElementById('bairro').value = (text)
    document.getElementById('cidade').value = (text)
    document.getElementById('uf').value = (text)
}
