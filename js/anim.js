export function animarSuc(text) {
    if (text != "") {
        const div = document.getElementById('resposta')
        const p = document.createElement("p")
        p.innerText = text
        p.className = "button-text"
        div.innerHTML = ""
        div.appendChild(p)
        div.style.transition = '1s'
        div.style.background = 'rgb(52, 255, 29, 0.7)'
        window.scrollTo(0, 0)
        animar(div)
    }
}

export function animarErr(text) {
    if (text != "") {
        const div = document.getElementById('resposta')
        const p = document.createElement("p")
        p.innerText = text
        p.className = "button-text"
        div.innerHTML = ""
        div.appendChild(p)
        div.style.transition = '1s'
        div.style.background = 'rgb(250, 11, 11, 0.7)'
        window.scrollTo(0, 0)
        animar(div)
    }
}

function animar(div) {
    setTimeout(function () {
        div.style.transition = '1s'
        div.style.background = 'rgba(255, 255, 255)'
    }, 2000)
}
