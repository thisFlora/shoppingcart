let precio = 0;
let nombre = "";
let iva = "";
let precioFinal = 0;
let suma = 0;
let listaCompra = "";
let carrito = [];
let lista = [];

const productos = [
    { id: 1, producto: "Brasil Catuai", precio: 1200, url:"./img/brasil01.png" },
    { id: 2, producto: "México Chiapas", precio: 1500, url:"./img/mexico01.png" },
    { id: 3, producto: "Kit Cafetero", precio: 2500, url:"./img/kit01.png" },
];

class Carrito {
    constructor(id, producto, precio, cantidad, url) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.url = url;
    }
}

function saludar() {
    (async () => {
        const { value: nombre } = await Swal.fire({
            title: "Bienvenido",
            input: "text",
            inputAttributes: {
                autocomplete: "off",
            },
            inputLabel: "Ingrese su nombre",
        });
        if (nombre) {
            Swal.fire(
                `Hola ${nombre}, a continuación podrás escoger productos de la tienda☕ `
            );
        }
    })();
}

saludar();

//Si hay algo en el carrito, lo recupero.
if (recuperarStorage("carrito")) {
    carrito = recuperarStorage("carrito");
}

//Capturo los objetos de los productos y cuando hagan clic ejecuto buscarId
let catuai = document.getElementById("catuai");
catuai.addEventListener("click", buscarId);

let chiapas = document.getElementById("chiapas");
chiapas.addEventListener("click", buscarId);

let kit = document.getElementById("kit");
kit.addEventListener("click", buscarId);

//Guardo el valor del data-id del HTML y se lo paso a la funcion comprar
function buscarId(e) {
    e.preventDefault();
    let btn = e.target;
    let idBtn = parseInt(btn.getAttribute("data-id"));
    comprar(idBtn);
}

function mostrarAlert() {
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });
    Toast.fire({
        icon: "success",
        title: "Se agregó el producto",
    });
}

//me fijo si hay un elemento con el mismo id, si hay le sumo 1 a la cantidad y si no, lo creo
function comprar(id) {
    let idProd = id;
    if (carrito.some((element) => element.id === idProd)) {
        const found = carrito.find((element) => element.id === idProd);
        found.cantidad++;
        mostrarAlert();
        guardarStorage("carrito", JSON.stringify(carrito));
        despliegaProductos();
    } else {
        const found = productos.find((element) => element.id === idProd);
        const id = found.id;
        const producto = found.producto;
        const precio = found.precio;
        const url = found.url;
        const agregarProd = new Carrito(id, producto, precio, 1, url);
        carrito.push(agregarProd);
        guardarStorage("carrito", JSON.stringify(carrito));
        mostrarAlert();
        despliegaProductos();
    }
}

//Agrego los productos al carrito en el html
function despliegaProductos() {
    const listaP = document.getElementById("lista");
    listaP.innerHTML = "";
    carrito.forEach((producto) => {
        console.log(producto);
        let prod = document.createElement("li");
        prod.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${producto.url}" class="img-fluid rounded-start" alt="img-producto">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${producto.producto}</h5>
                                            <p class="card-text">Precio: $${producto.precio}</p>
                                            <p>Cantidad:<input type="number" min="1" max="10" step="1" autocomplete="off" value="${producto.cantidad}"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;                   
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

let finaliza = document.getElementById("fin");
finaliza.addEventListener("click", finalizarCompra);

function finalizarCompra() {
    precioFinal = sumarCostos();
    Swal.fire(
        `El total de su compra es: $${precioFinal} `
    );
    vaciarCarrito();
    setTimeout(() => {
        location.reload();
    }, 3000);
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
