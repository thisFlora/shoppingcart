let listaCompra = "";
let carrito = [];
let lista = [];
let productos;

$.ajax({
    url: "./json/productos.json",
    data: {},
    type: "GET",
    success: function (response) {
        productos = response;
    },
});

class Carrito {
    constructor(id, producto, precio, cantidad, url) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.url = url;
    }
}

//Si hay algo en el carrito, consulto al usuario.
    if (recuperarStorage("carrito")) {
        $(document).ready(function () {
            let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
            myModal.show();
        })
        let btnSi = $("#btn-aceptar").click(recuperarCart);
        let btnNo = $("#btn-cancelar").click(recuperarCart);
}


function recuperarCart(e) {
    e.preventDefault();
    let btn = e.target;
    let value = parseInt(btn.getAttribute("data-id"));
    if(value === 0){
        carrito = recuperarStorage("carrito");
        despliegaProductos();
    } else {
        localStorage.clear();
        vaciarCarrito();
    }
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
    cart = carrito;
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
            pintarCarrito();
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
                pintarCarrito();
                if(carrito.length ===  0){
                    localStorage.clear();
                } else {
                    guardarStorage("carrito", JSON.stringify(carrito));
                }
            } else {
                found.cantidad--;
                guardarStorage("carrito", JSON.stringify(carrito));
                // vuelvo a cargar el carrito a mostrar
                despliegaProductos();
                pintarCarrito();
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

$(document).ready(() => {
    $("#btn-home").click(() => {
        $(".focus").removeClass("focus");
        $("#catalogo").addClass("focus");
        $("#main-carrito").removeClass("mb-5");
    });
    $("#verCarrito").click(() => {
        $(".focus").removeClass("focus");
        pintarCarrito();
        $("#cart").addClass("focus");
    });
    $("#nav-link-home").click(() => {
        $(".focus").removeClass("focus");
        $("#menu").addClass("focus");
    });
    $("#nav-link-prod").click(() => {
        $(".focus").removeClass("focus");
        $("#catalogo").addClass("focus");
    });
})
