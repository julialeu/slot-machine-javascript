//Array de imágenes
var listaImagenes = ["aubergine", "banana", "carrots", "cherries",
    "dollar", "lemon", "orange", "peach",
    "potato", "tomato"];

/*Array de frutas y verduras. Se utiliza cuando
llamamos al método calcularPremio. Únicamente para el supuesto
de que salgan 2 o 3 frutas u hortalizas iguales.
 */
var listaFrutasYHortalizas = ["aubergine", "banana", "carrots", "cherries",
    "lemon", "orange", "peach", "potato", "tomato"];


let numeroMonedasActual = 0; //Variable global con el que trabajaremos en diferentes partes del código

function introducirMonedas() {
    /* Creamos la variable al que se le asigna el número de monedas introducidas.
   Se emplea el método parseInt porque el número introducido es un string. */
    let numeroMonedasIntroducidas = parseInt(document.getElementById('numeroMonedasIntroducidas').value);
    //Debemos contemplar el supuesto de que se introduzca 0 monedas y un NaN
    if (isNaN(numeroMonedasIntroducidas) || numeroMonedasIntroducidas === 0) {
        alert("Introduce un número de monedas válido");
        return false;
    }

    //Creamos una variable al que se le asigna el elemento de html con dicho ID.
    let botonIntroducirElement = document.getElementById('botonIntroducirMonedas');
    //Deshabilitamos el botón en el momento en que hacemos click en introducir (onClick)
    botonIntroducirElement.disabled = true;

    console.log('Número de monedas introducidas', numeroMonedasIntroducidas);
    numeroMonedasActual = numeroMonedasActual + numeroMonedasIntroducidas;
    console.log('Número de monedas actual', numeroMonedasActual);
    mostrarNumeroMonedasActuales(); //Método para mostrar el número de monedas por pantalla

    //Cuando introducimos monedas llamamos al método que muestra mensajes en el historial
    añadirMensaje('Has introducido monedas');

    //Se inhabilita la casilla donde introducimos el número de monedas cuando damos a introducir
    let numeroMonedasIntroducidasElement = document.getElementById('numeroMonedasIntroducidas');
    numeroMonedasIntroducidasElement.disabled = true;
    numeroMonedasIntroducidasElement.value = 0;
}

//Método para mostrar el número de monedas por pantalla.
function mostrarNumeroMonedasActuales() {
    document.getElementById('numMonedasActuales').innerHTML = numeroMonedasActual;
}

function salir() {
    //Cuando damos a salir, se retiran las monedas,que son las acumuladas al finalizar el juego.
    alert('Has conseguido un total de ' + numeroMonedasActual + ' monedas.');
    añadirMensaje('Has conseguido ' + numeroMonedasActual + ' monedas.')

    //Las monedas ganadas se retiran a la entrada
    document.getElementById('numeroMonedasIntroducidas').value = numeroMonedasActual;
    numeroMonedasActual = 0; //Igualamos en este instante las monedas a 0.
    mostrarNumeroMonedasActuales();
    //console.log('Número de monedas actual', numeroMonedasActual);

    let botonVolverIntroducirMonedas = document.getElementById('botonIntroducirMonedas');
    botonVolverIntroducirMonedas.disabled = false; //Activamos el botón de introducir

    let numeroMonedasIntroducidasElement = document.getElementById('numeroMonedasIntroducidas');
    numeroMonedasIntroducidasElement.disabled = false; //Activamos la casilla para introducir más monedas
}

function añadirMensaje(mensajeTexto) {
    let historialElement = document.getElementById('historial'); //El historial es un ol
    let mensajeElement = document.createElement('li');//Item del ol
    mensajeElement.innerHTML = mensajeTexto; //El mensaje que le pasamos por parámetro cuando llamamos a la función.

    historialElement.prepend(mensajeElement);//Se añade el nodo li en el padre ol (historial de movimientos).
    //Por usabilidad y facilidad de lectura, he elegido prepend en lugar de appendChild.
}
//Función para bajar la palanca.
function bajarPalanca() {
    //Si no se introduce monedas, salta el alert().
    if (numeroMonedasActual === 0) {
        alert('Por favor, introduce monedas.');
        return;
    }
    //Cada tirada gasta una moneda y se muestra por pantalla
    numeroMonedasActual = numeroMonedasActual - 1;

    //Si se agotan las monedas, se habilita el botón de introducir.
    if (numeroMonedasActual === 0) {
        document.getElementById('botonIntroducirMonedas').disabled = false;
    }

    añadirMensaje('Gastas una moneda');//Mostramos en el historial el mensaje.

    console.log('palancaDown')
    let palancaImageElement = document.getElementById('palanca');
    palancaImageElement.src = "/img/palancaDOWN.png"; //Cambiamos la imagen de la palanca cuando hacemos click en ella
}

function subirPalanca() {
    //Cuando soltamos click, la imagen se cambia para mostrar la palanca hacia arriba.
    let palancaImageElement = document.getElementById('palanca');
    palancaImageElement.src = "/img/palancaUP.png";
    //Definimos la variable que es un número aletarorio para cada imagen.
    let aleatorio1 = Math.floor(Math.random() * listaImagenes.length);//se obtiene con el método math.random
    let fruta1 = listaImagenes[aleatorio1]; //El número aleatorio es un índice del array de imágenes.
    let imagen1 = document.getElementById('imagen1');
    imagen1.src = "/img/" + fruta1 + ".png";

    let aleatorio2 = Math.floor(Math.random() * listaImagenes.length);
    let fruta2 = listaImagenes[aleatorio2];
    let imagen2 = document.getElementById('imagen2');
    imagen2.src = "/img/" + fruta2 + ".png";

    let aleatorio3 = Math.floor(Math.random() * listaImagenes.length);
    let fruta3 = listaImagenes[aleatorio3];
    let imagen3 = document.getElementById('imagen3');
    imagen3.src = "/img/" + fruta3 + ".png";

    let premio = calcularPremio(fruta1, fruta2, fruta3);

    numeroMonedasActual = numeroMonedasActual + premio;

    mostrarNumeroMonedasActuales();
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

    // 2 hortalizas o 2 frutas iguales
    if(hayExactamenteDosFrutasIguales(img1, img2, img3)) {
        añadirMensaje('¡Dos frutas u hortalizas iguales! Ganas 2 monedas.');

        return 2;
    }

    //3 monedas
    if(hayTresMonedas(img1, img2, img3)) {
        añadirMensaje('¡Tres monedas! Ganas 10 monedas.');

        return 10;
    }

    //2 monedas
    if(hayDosMonedas(img1, img2, img3)) {
        añadirMensaje('¡Dos monedas! Ganas 4 monedas.');

        return 4;
    }

    //1 moneda
    if(hayUnaMoneda(img1, img2, img3)) {
        añadirMensaje('¡Una moneda! Ganas 1 moneda.');

        return 1;
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
    //Creamos la variable tipo para después compararlas con las imágenes en el método hayExactamenteDosDeEsteTipo
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

//Aquí reutilizamos la función del caso anterior
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

//Función cuando se ganan 3 monedas
function hayTresMonedas(img1, img2, img3) {

    if (img1 === 'dollar' && img2 === 'dollar' && img3 === 'dollar') {
        return true;
    }

    return false;
}

//Función cuando se ganan dos monedas.
function hayDosMonedas(img1, img2, img3) {

    let moneda = 'dollar';

    if (img1 === moneda && img2 === moneda && img3 !== moneda) {
        return true;
    }

    if (img1 === moneda && img2 !== moneda && img3 === moneda) {
        return true;
    }

    if (img1 !== moneda && img2 === moneda && img3 === moneda) {
        return true;
    }

    return false;
}

//Función cuando se gana una sola moneda.
function hayUnaMoneda(img1, img2, img3) {
    if (img1 === 'dollar' || img2 === 'dollar' || img3 === 'dollar') {
        return true;
    }

    return false;

}