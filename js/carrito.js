let cart = [];
let iva = "";
let precio = 0;
let precioFinal = 0;

if (recuperarStorage("carrito")) {
    cart = recuperarStorage("carrito");
}

$(document).ready(function () {
    pintarCarrito();
})

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave));
}

function pintarCarrito() {
    console.log("pintarCarrito");
    $("#carrito").empty();
    cart.forEach((producto) => {
        $('#carrito').append(`<div id=${producto.id} class="card mb-3 mt-3" style="max-width: 600px;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="../${producto.url}" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${producto.producto}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <p class="card-text">
                        Cantidad:
                        <span class="box-cantidad">
                        <span id="cantidad">${producto.cantidad}</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>`);
    });
}

let finaliza = $("#fin").click( () => {
    finalizarCompra();});

$("#sitIva").change(function (e) {
    let value = e.target.value;
    iva = value;
    precio = sumarCostos()
    if (iva === 'responsable') {
        precioFinal = precio * 1.21;
    } else{
        precioFinal = precio;
    }
})

function sumarCostos() {
    const nPrecio = cart.reduce(
        (acc, { cantidad, precio }) => acc + cantidad * precio,
        0
    );
    return nPrecio;
}


function finalizarCompra() {
    Swal.fire(
        `El total de su compra es: $${precioFinal} `
    );
    vaciarCarrito();
}

function vaciarCarrito() {
    cart.splice(0, cart.length);
    suma = 0;
    precioFinal = 0;
    localStorage.clear();
    setTimeout(() => {
        document.location.href="https://thisflora.github.io/shoppingcart/";
    }, 3000);
}