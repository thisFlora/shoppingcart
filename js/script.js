let precio = 0;
let nombre = "";
let iva = "";
let precioFinal = 0;
let suma = 0;
let listaCompra = "";
let carrito = [];
let lista = [];

const productos = [
    { id: 1, producto: "Brasil Catuai", precio: 1200 },
    { id: 2, producto: "México Chiapas", precio: 1500 },
    { id: 3, producto: "Kit Cafetero", precio: 2500 },
];

class Carrito {
    constructor(id, producto, precio, cantidad) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

function saludar() {
    alert(
        "Bienvenido/a " +
        nombre +
        ", a continuacion podrá escoger productos de la tienda☕"
    );
}
nombre = prompt("Ingrese su nombre");
saludar();

if (recuperarStorage("carrito")) {
    carrito = recuperarStorage("carrito");
}

function comprar(id) {
    let idProd = id;
    if (carrito.some((element) => element.id === idProd)) {
        const found = carrito.find((element) => element.id === idProd);
        found.cantidad++;
        guardarStorage("carrito", JSON.stringify(carrito));
        despliegaProductos();
    } else {
        const found = productos.find((element) => element.id === idProd);
        const { id, producto, precio } = found;
        const agregarProd = new Carrito(id, producto, precio, 1);
        carrito.push(agregarProd);
        guardarStorage("carrito", JSON.stringify(carrito));
        despliegaProductos();
    }
}

function despliegaProductos(){
    const listaP = document.getElementById("lista");
    listaP.innerHTML = "";
    carrito.forEach((producto) => {
        let prod = document.createElement("li");
        prod.innerHTML = `<p style="color: white">${producto.producto} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}</p>`;
        listaP.appendChild(prod);
    });
}

function guardarStorage(clave, valor) {
    localStorage.setItem(clave, valor);
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

function sumarCostos() {
    const nPrecio = carrito.reduce(
        (acc, { cantidad, precio }) => acc + cantidad * precio,
        0
    );
    return nPrecio;
}

function finalizarCompra() {
    precioFinal = sumarCostos();
    alert("El total de su compra es: $" + precioFinal);
    iva = prompt(
        "Ingrese su condición ante el IVA \n 1: Responsable Inscripto \n 2: Exenta"
    );
    precioIva();
    vaciarCarrito();
    setTimeout(() => {
        location.reload();
    }, 3000);
}

function precioIva() {
    if (iva == "1") {
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
    localStorage.clear();
}

function ordenarLista() {
    return carrito.sort((firstId, secondId) => firstId.id - secondId.id);
}
