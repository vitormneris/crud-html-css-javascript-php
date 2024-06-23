var mapa = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mapa);

mapa.scrollWheelZoom.disable();

function buscarLocal(lat, lon) {
    mapa.setView([lat, lon], 15);
    var pontoMarcador = L.marker([lat, lon]).addTo(mapa);
    pontoMarcador.bindPopup('Você está aqui').openPopup();
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
    setTimeout(function () {
        resultado.style.transition = '1s';
        resultado.style.background = 'rgba(0, 0, 0, 0.2)';
    }, 2000);
}

function mostrarMapa(cep) {
    if (!cep) {
        resultado.innerHTML = '<p>CEP não encontrado</p>';
        animarErr();
    }

    const resultado = document.getElementById('resposta');
    const chave = '22acd8a06ed44f17b5fa98ba2d9b7e54';

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${chave}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const coordenadas = {
                    latitude: data.results[0].geometry.lat,
                    longitude: data.results[0].geometry.lng
                }
                buscarLocal(coordenadas.latitude, coordenadas.longitude);
            } else {
                resultado.innerHTML = '<p>CEP não encontrado</p>';
                animarErr();
            }
        })
        .catch(error => resultado.innerHTML = '<p>Erro ao exibir o mapa</p>');
}

function limpa_formulário_cep() {
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    }
    else {
        limpa_formulário_cep();
        resultado.innerHTML = '<p>CEP não encontrado</p>';
        animarErr();
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            mostrarMapa(cep);
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            fetch("https://viacep.com.br/ws/" + cep + "/json/", requestOptions)
                .then(response => response.json())
                .then(data => meu_callback(data))
                .catch(error => console.log('error', error));
        }
        else {
            limpa_formulário_cep();
            resultado.innerHTML = '<p>Formato de CEP inválido</p>';
            animarErr();
        }
    }
    else {
        limpa_formulário_cep();
    }
};


