let catuai = 1200;
let chiapas = 1500;
let kit = 2500;
let producto1 = "";
let producto2 = "";
let precio = 0;
let nombre = "";
let iva = "";
let seguirCompra = ""; 

function saludar() {
    alert('Bienvenido/a ' + nombre + ', a continuacion podrá escoger productos de la tienda☕');
}

function sumarCostos() {
    if(seguirCompra.toLowerCase() === 'si'){
        if (producto1 == "1" && producto2 == "2") {
            return catuai + chiapas;
        } else if (producto1 == "1" && producto2 == "3") {
            return catuai + kit;
        } 
        else if (producto1 == "1" && producto2 =="1"){
            return catuai + catuai;
        }else if (producto1 == "2" && producto2 == "1") {
            return chiapas + catuai;
        }else if (producto1 == "2" && producto2 == "3"){
            return chiapas + kit;
        }else if (producto1 == "2" && producto2 == "2"){
            return chiapas + chiapas;
        }else if (producto1 == "3" && producto2 == "1"){
            return kit + catuai;
        }else if (producto1 == "3" && producto2 == "2"){
            return kit + chiapas;
        }else if (producto1 == "3" && producto2 == "3"){
            return kit + kit;
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
    precio = sumarCostos();
    alert(" Tu compra es por un total de $" + precio);
}

function precioIva() {
    if(iva == '1') {
        precio = precio * 1.21;
        return alert("Tu precio final es $" + precio);
    } else {
        return alert("Tu precio final es $" + precio);
    }
}

nombre = prompt("Ingrese su nombre");
saludar();

producto1 = prompt(
    "elija uno de nuestros productos \n 1: Catuaí Brasil \n 2: México Chiapas \n 3: Kit Cafetero"
);

seguirCompra = prompt("¿Quiere seguir comprando?");
if (seguirCompra.toLowerCase() === 'si') {
    producto2 = prompt(
        "elija otro de nuestros productos \n 1: Catuaí Brasil \n 2: México Chiapas \n 3: Kit Cafetero"
    );
}
finalizarCompra();

iva = prompt('Ingrese su condición ante el IVA \n 1: Responsable Inscripto \n 2: Exenta');
precioIva();
