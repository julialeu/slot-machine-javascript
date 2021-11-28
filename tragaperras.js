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
