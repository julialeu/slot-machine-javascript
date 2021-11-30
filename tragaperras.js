var listaImagenes = ["aubergine", "banana", "carrots", "cherries",
    "dollar", "lemon", "orange", "peach",
    "potato", "tomato"];

var listaFrutasYHortalizas = ["aubergine", "banana", "carrots", "cherries",
    "lemon", "orange", "peach", "potato", "tomato"];

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
    let aleatorio1 = Math.floor(Math.random() * listaImagenes.length);
    let fruta1 = listaImagenes[aleatorio1];
    // fruta1 = 'banana';
    let imagen1 = document.getElementById('imagen1');
    imagen1.src = "/img/" + fruta1 + ".png";

    let aleatorio2 = Math.floor(Math.random() * listaImagenes.length);
    let fruta2 = listaImagenes[aleatorio2];
    // fruta2 = 'banana';
    let imagen2 = document.getElementById('imagen2');
    imagen2.src = "/img/" + fruta2 + ".png";

    let aleatorio3 = Math.floor(Math.random() * listaImagenes.length);
    let fruta3 = listaImagenes[aleatorio3];
    // fruta3 = 'banana';
    let imagen3 = document.getElementById('imagen3');
    imagen3.src = "/img/" + fruta3 + ".png";

    let premio = calcularPremio(fruta1, fruta2, fruta3);

    numeroMonedasActual = numeroMonedasActual + premio;
}

function calcularPremio(img1, img2, img3) {
    //    1 moneda + dos hortalizas o dos frutas
    if (hayUnaSolaMoneda(img1, img2, img3) && hayExactamenteDosFrutasIguales(img1, img2, img3)) {
        añadirMensaje('¡Una moneda y dos hortalizas o frutas! Ganas 3 monedas.');
        return 3;
    }

    // 3 hortalizas o frutas iguales
    if (hayExactamenteTresFrutasIguales(img1, img2, img3)) {
        añadirMensaje('¡Tres hortalizas iguales! Ganas 5 monedas.');

        return 5;
    }

    return 0;
}

function hayUnaSolaMoneda(img1, img2, img3) {
    if (img1 === 'dollar' && img2 !== 'dollar' && img3 !== 'dollar') {
        return true
    }

    if (img1 !== 'dollar' && img2 === 'dollar' && img3 !== 'dollar') {
        return true
    }

    if (img1 !== 'dollar' && img2 !== 'dollar' && img3 === 'dollar') {
        return true
    }

    return false;
}

function hayExactamenteDosFrutasIguales(img1, img2, img3) {

    let tipo = '';
    for (let indice in listaFrutasYHortalizas) {
        tipo = listaFrutasYHortalizas[indice];
        // console.log('tipo', tipo);
        if (hayExactamenteDosDeEsteTipo(tipo, img1, img2, img3)) {
            // console.log('Sí había');
            return true;
        }
    }

    return false;
}

function hayExactamenteTresFrutasIguales(img1, img2, img3) {

    let tipo = '';
    for (let indice in listaFrutasYHortalizas) {
        tipo = listaFrutasYHortalizas[indice];
        // console.log('tipo', tipo);
        if (hayExactamenteTresDeEsteTipo(tipo, img1, img2, img3)) {
            // console.log('Sí había');
            return true;
        }
    }

    return false;
}

function hayExactamenteDosDeEsteTipo(tipo, img1, img2, img3) {
    if (img1 === tipo && img2 === tipo && img3 !== tipo) {
        return true;
    }

    if (img1 === tipo && img2 !== tipo && img3 === tipo) {
        return true;
    }

    if (img1 !== tipo && img2 === tipo && img3 === tipo) {
        return true;
    }

    return false;
}

function hayExactamenteTresDeEsteTipo(tipo, img1, img2, img3) {

    if (img1 === tipo && img2 === tipo && img3 === tipo) {
        return true;
    }

    return false;
}