
// Objeto de carrito de compras - array de objetos-compra
class CarritoDeCompras {
    constructor () {
        this.listaCompras = [];
    }
    agregarCompra = function(compra) {
        this.listaCompras.push(compra);
        localStorage.setItem('carrito', JSON.stringify(this.listaCompras));
    }
    tomarDatosIniciales = function() {
        if (localStorage.getItem('carrito') != null) {
            this.listaCompras = JSON.parse(localStorage.getItem('carrito'));
        }
    }
    precioFinal = function () {
        let precioTotal = 0;
        for (let compra of this.listaCompras) {
            precioTotal += compra.precio;
        }
        return precioTotal;
    }
}

// Objeto de compra, se agrega al carrito
class Compra {
    constructor (producto, precio) {
        this.producto = producto;
        this.precio = precio;
    }
}

var nuevoCarritoDeCompras = new CarritoDeCompras();
nuevoCarritoDeCompras.tomarDatosIniciales();

// ejemplos para chequear la funcionalidad

// var nuevaCompra = new Compra('Manejo basico', 8500);
// nuevoCarritoDeCompras.agregarCompra(nuevaCompra);
// nuevaCompra = new Compra('Gestor', 2500);
// nuevoCarritoDeCompras.agregarCompra(nuevaCompra);
// console.log(nuevoCarritoDeCompras.listaCompras);
// console.log(nuevoCarritoDeCompras.precioFinal());


// ============
// Navegacion - Menu mobile
// ============

var botonMobileAbrir = document.getElementById("nav__mobile-abrir");
var botonMobileCerrar = document.getElementById("nav__mobile-cerrar");
var headerNavegacion = document.getElementsByClassName("header__nav");
var headerLinks = document.getElementsByClassName("navegacion__link");

botonMobileAbrir.addEventListener("click", () => {
    headerNavegacion[0].classList.toggle("header__nav-active");
})
botonMobileCerrar.addEventListener("click", () => {
    headerNavegacion[0].classList.toggle("header__nav-active");
})
for (link of headerLinks) {
    link.addEventListener("click", () => {
        headerNavegacion[0].classList.toggle("header__nav-active");
    })
}

// ============
// Boton Cursos
// ============


var cursoAccBoton = document.getElementsByClassName("cursos__header");
var cursoInfo = document.getElementsByClassName("cursos__info");
var cursoItem = document.getElementsByClassName("cursos__item");

for (let i = 0; i < cursoAccBoton.length; i++) {
    cursoAccBoton[i].addEventListener("click", function () {
        cursoAccBoton[i].classList.toggle("cursos__header-active");
        cursoInfo[i].classList.toggle("cursos__info-active");
        cursoItem[i].classList.toggle("cursos__item-active");
    })
}