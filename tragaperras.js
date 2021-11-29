var listaImagenes = ["aubergine", "banana", "carrots", "cherries",
    "dollar", "lemon", "orange", "peach",
    "potato", "tomato"];

let numeroMonedasActual = 0;

function introducirMonedas() {
    let botonIntroducirElement = document.getElementById('botonIntroducirMonedas');
    botonIntroducirElement.disabled = true;


    let numeroMonedasIntroducidas = parseInt(document.getElementById('numeroMonedasIntroducidas').value);
    console.log('Número de monedas introducidas', numeroMonedasIntroducidas);
    numeroMonedasActual = numeroMonedasActual + numeroMonedasIntroducidas;
    console.log('Número de monedas actual', numeroMonedasActual);
    mostrarNumeroMonedasActuales();

    añadirMensaje('Has introducido monedas');

}

function mostrarNumeroMonedasActuales() {
    document.getElementById('numMonedasActuales').innerHTML = numeroMonedasActual;
}

function salir() {
    alert('Has conseguido un total de ' + numeroMonedasActual + ' monedas.');

    document.getElementById('numeroMonedasIntroducidas').value = numeroMonedasActual;
    numeroMonedasActual = 0;
    mostrarNumeroMonedasActuales();
    console.log('Número de monedas actual', numeroMonedasActual);

}

function añadirMensaje(mensajeTexto) {
    let historialElement = document.getElementById('historial');
    let mensajeElement = document.createElement('li');
    mensajeElement.innerHTML = mensajeTexto;

    historialElement.appendChild(mensajeElement);
}

function bajarPalanca() {
    if (numeroMonedasActual === 0) {
        alert('Por favor, introduce monedas.');
        return;
    }
    numeroMonedasActual = numeroMonedasActual - 1;
    document.getElementById('numMonedasActuales').innerHTML = numeroMonedasActual;

    if (numeroMonedasActual === 0) {
        document.getElementById('botonIntroducirMonedas').disabled = false;
    }

    añadirMensaje('Gastas una moneda');

    console.log('palancaDown')
    let palancaImageElement = document.getElementById('palanca');
    palancaImageElement.src = "/img/palancaDOWN.png";
}

function subirPalanca() {
    let palancaImageElement = document.getElementById('palanca');
    palancaImageElement.src = "/img/palancaUP.png";
    let aleatorio1 = Math.floor(Math.random()*listaImagenes.length);
    let fruta1 = listaImagenes[aleatorio1];
    console.log(fruta1);
    let imagen1 = document.getElementById('imagen1');
    imagen1.src = "/img/" + fruta1 + ".png";

    let aleatorio2 = Math.floor(Math.random()*listaImagenes.length);
    let fruta2 = listaImagenes[aleatorio2];
    console.log(fruta2);
    let imagen2 = document.getElementById('imagen2');
    imagen2.src = "/img/" + fruta2 + ".png";

    let aleatorio3 = Math.floor(Math.random()*listaImagenes.length);
    let fruta3 = listaImagenes[aleatorio3];
    console.log(fruta3);
    let imagen3 = document.getElementById('imagen3');
    imagen3.src = "/img/" + fruta3 + ".png";


}


