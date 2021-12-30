function saludar() {
    alert('Bienvenido/a ' + nombre + ', a continuacion podrá escoger productos de la tienda☕');
}

function sumarCostos() {
    if(seguirCompra.toLowerCase() === 'si'){
        if (producto1 == "1" && producto2 == "2") {
            return catuai + chiapas;
        } else if (producto1 == "1" && producto2 == "3") {
            return catuai + kit;
        } else if (producto1 == "2" && producto2 == "1") {
            return chiapas + catuai;
        }else if (producto1 == "2" && producto2 == "3"){
            return chiapas + kit;
        }else if (producto1 == "3" && producto2 == "1"){
            return kit + catuai;
        }else if (producto1 == "3" && producto2 == "2"){
            return kit + chiapas;
        }
    } else {
        if(producto1 == "1"){
            return catuai;
        } else if(producto1 == "2"){
            return chiapas;
        }else {
            return kit;
        }
    }

}

function finalizarCompra() {
    alert(" Tu compra es por un total de $ " + sumarCostos());
}

// main
let nombre = prompt("Ingrese su nombre");
saludar();

let catuai = 1200;
let chiapas = 1500;
let kit = 2500;
let producto2 = "";
let producto1 = prompt(
    "elija uno de nuestros productos \n 1: Catuaí Brasil \n 2: México Chiapas \n 3: Kit Cafetero"
);
let seguirCompra = prompt("¿Quiere seguir comprando?");
if (seguirCompra.toLowerCase() === 'si') {
    producto2 = prompt(
        "elija otro de nuestros productos \n 1: Catuaí Brasil \n 2: México Chiapas \n 3: Kit Cafetero"
    );
}
finalizarCompra();

