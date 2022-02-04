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

//Si hay algo en el carrito, lo recupero.
if (recuperarStorage("carrito")) {
    carrito = recuperarStorage("carrito");
}

//Capturo los objetos de los productos y cuando hagan clic ejecuto buscarId
let catuai = $("#catuai").click(buscarId);
let chiapas = $("#chiapas").click(buscarId);
let kit = $("#kit").click(buscarId);

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
    $("#lista").empty();
    carrito.forEach((producto) => {
        $('#lista').append(`<div id=${producto.id} class="card mb-3" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${producto.url}" class="img-fluid rounded-start" alt="img-producto">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title producto">${producto.producto}</h5>
                                            <p class="card-text precio">Precio: $${producto.precio}</p>
                                            <p>Cantidad:
                                            <span class="box-cantidad">
                                            <button class="btn btn-secondary btn-sm quitar" id="restar${producto.id}">-</button>
                                            <span id="cantidad">${producto.cantidad}</span>
                                            <button class="btn btn-secondary btn-sm agregar" id="sumar${producto.id}">+</button>
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
        $(`#sumar${producto.id}`).click(e => {
            let found = ""
            const idEl = producto.id;
            if (carrito.some((element) => element.id === idEl)) {
                found = carrito.find((element) => element.id === idEl);
                found.cantidad++;
                guardarStorage("carrito", JSON.stringify(carrito));
                // vuelvo a cargar el carrito a mostrar
                despliegaProductos();
            } 
        });

        $(`#restar${producto.id}`).click(e => {
            let found = ""
            const idEl = producto.id;
            if (carrito.some((element) => element.id === idEl)) {
                found = carrito.find((element) => element.id === idEl);
                if(found.cantidad === 1){
                    found.cantidad--;
                    // removemos del carrito cantidades en 0
                    carrito = carrito.filter(function (el) {
                        return el.cantidad !== 0;
                    });
                    // removemos del UI el producto en 0
                    $(`#${idEl}`).remove();
                    
                } else {
                    found.cantidad--;
                    guardarStorage("carrito", JSON.stringify(carrito));
                    // vuelvo a cargar el carrito a mostrar
                    despliegaProductos();
                }
            } 
        });
    });
}

function guardarStorage(clave, valor) {
    localStorage.setItem(clave, valor);
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}



