let precio = 0;
let nombre = "";
let iva = "";
let precioFinal = 0; 
let suma = 0;
let listaCompra = "";
const carrito = [];
let lista = [];

const productos = [
    { id: 1, producto: "Brasil Catuai", precio: 1200, cantidad: 1},
    { id: 2, producto: "México Chiapas", precio: 1500, cantidad: 1},
    { id: 3, producto: "Kit Cafetero", precio: 2500, cantidad: 1}
];

function saludar() {
    alert('Bienvenido/a ' + nombre + ', a continuacion podrá escoger productos de la tienda☕');
}
nombre = prompt("Ingrese su nombre");
saludar();

function comprar(id) {
    const found = productos.find(element => element.id === id);
        if(found.id == id){
            carrito.push(found);
        }
}
function sumarCostos() {
    for(const producto of carrito){
        suma = suma + producto.precio;
        console.log("Estoy en sumarCostos() y el precio actual es:" + suma);
    }
    return suma;
}

function finalizarCompra() {
    listaCompra = prompt("¿Desea ver la lista de su carrito de compras?");
    if(listaCompra.toUpperCase() == 'SI') {
    mostrarLista();
    }
    precioFinal = sumarCostos();
    alert("El total de su compra es: $" + precioFinal);
    iva = prompt('Ingrese su condición ante el IVA \n 1: Responsable Inscripto \n 2: Exenta');
    precioIva();
    vaciarCarrito();
}

function precioIva() {
    if(iva == '1') {
        precio = precioFinal * 1.21;
        return alert("El precio final de tu compra es $" + precio);
    } else {
        return alert("El precio final de tu compra es $" + precioFinal);
    }
}

function vaciarCarrito() {
    carrito.splice(0, carrito.length);
    suma = 0;
    precioFinal = 0;
}

function mostrarLista() {
        carrito.sort((firstId, secondId) => firstId.id - secondId.id);
        for(let prod of carrito){
            lista.push(prod.producto);
        }
    alert(lista.join("\n"));
    lista.splice(0, lista.length);
}