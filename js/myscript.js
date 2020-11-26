
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


// ============
// Navegacion - Menu mobile
// ============

var botonMobileAbrir = $("#nav__mobile-abrir");
var botonMobileCerrar = $("#nav__mobile-cerrar");
var headerNavegacion = $(".header__nav");
var headerLinks = $(".navegacion__link");

botonMobileAbrir.click( () => {
    headerNavegacion.addClass("header__nav-active");
})
botonMobileCerrar.click( () => {
    headerNavegacion.removeClass("header__nav-active");
})
headerLinks.click( ()=> {
    headerNavegacion.removeClass("header__nav-active")
})

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



//=============
// Validar form contacto
//=============

const contactoNombre = document.getElementById("contacto-nombre");
const contactoEmail = document.getElementById("contacto-email");
const contactoTelefono = document.getElementById("contacto-telefono");
const contactoMensaje = document.getElementById("contacto-mensaje");


contactoNombre.addEventListener("change", () => {
    let numberCheck;
    let label = document.getElementById("label-nombre");
    for (caracter of contactoNombre.value) {
        if (!isNaN(caracter)) {
            numberCheck = true;
        } else {
            numberCheck = false;
        }
    }
    if ((contactoNombre.value.length < 3) | (contactoNombre.value.length > 30) | numberCheck === true) {    
        label.innerHTML = "*Por favor, ingresa un nombre válido (Ejemplo: Juan Perez)";
    } else {
        label.innerHTML = "";
    }
})

contactoEmail.addEventListener("change", () => {
    let label = document.getElementById("label-email");
    if (contactoEmail.value.indexOf("@") == -1 | contactoEmail.value.indexOf(".") == -1 | contactoEmail.value.indexOf(" ") != -1) {
        label.innerHTML = "* Formato de email no válido (Ejemplo: nombre@email.com)";
    } else {
        label.innerHTML = "";
    }
})

contactoTelefono.addEventListener("change", () => {
    let label = document.getElementById("label-telefono");
    if (contactoTelefono.value.length < 7 | contactoTelefono.value.length > 16) {
        label.innerHTML = "* Número telefónico no válido";
    } else {
        label.innerHTML = "";
    }
    for (caracter of contactoTelefono.value) {
        if (isNaN(caracter) == true) {
            label.innerHTML = "* Ingresa sólo números válidos, sin otros caracteres (Ej: 02914445555)"
        }
    }
})

contactoMensaje.addEventListener("change", () => {
    let label = document.getElementById("label-mensaje");
    if (contactoMensaje.value.length < 5) {
        label.innerHTML = "* Por favor, déjanos una consulta :)"
    } else {
        label.innerHTML = "";
    }
})

// =================
// FROMULARIO COMPRA
// =================

const comprarAbrir = document.getElementById('comprar-abrir');
const comprarCerrar = document.getElementById('comprar-cerrar');
const modalComprar = document.getElementById('comprar');
const contenedorComprar = document.getElementById('contenedor__compra')

comprarAbrir.addEventListener('click', ()=> {
    modalComprar.classList.add("comprar-active");
    modalComprar.firstElementChild.classList.add("contenedor__compra-active");
})
comprarCerrar.addEventListener('click', ()=> {
    modalComprar.classList.remove("comprar-active");
    modalComprar.firstElementChild.classList.remove("contenedor__compra-active");
})
contenedorComprar.addEventListener('click', (e) => {
    e.stopPropagation();
})
modalComprar.addEventListener('click', ()=> {
    modalComprar.classList.remove("comprar-active");
    modalComprar.firstElementChild.classList.remove("contenedor__compra-active");
})


// formulario slider

let slideIndex = 0;

const dots = document.getElementsByClassName('dot');
const autito = document.getElementById("autito");
const line = document.getElementById("line");


const formularioSlider = document.getElementById('formulario__compra');
const compraSlide = document.getElementsByClassName('compra__slide');


// botones
const botonSiguiente = document.getElementById('boton__siguiente');
const botonVolver = document.getElementById('boton__volver');

botonSiguiente.addEventListener('click', ()=> {
    let size = compraSlide[0].clientWidth;
    if (slideIndex < 3) {
        slideIndex++;
        formularioSlider.style.transform = 'translateX(' + (-size * slideIndex) +'px)';

        autitoAvanzar();
        dotCheck()
    }
})
botonVolver.addEventListener('click', ()=> {
    let size = compraSlide[0].clientWidth;
    if (slideIndex === 0) {
        comprarCerrar.click();
    }
    if (slideIndex > 0) {
        slideIndex--;
        formularioSlider.style.transform = 'translateX(' + (-size * slideIndex) +'px)';

        autitoVolver();
        dotCheck()
    }
})



function autitoAvanzar() {
    let distanciaDots = (Math.floor(dots[1].getBoundingClientRect().left)) - (Math.floor(dots[0].getBoundingClientRect().left))
        autito.style.transform = 'translateX(' + (distanciaDots * slideIndex) + 'px)';
        line.style.width = (distanciaDots * slideIndex) + 'px';

}
function autitoVolver() {
    let distanciaDots = (Math.floor(dots[1].getBoundingClientRect().left)) - (Math.floor(dots[0].getBoundingClientRect().left))
        autito.style.transform = 'translateX(' + (distanciaDots * slideIndex) + 'px)';
        line.style.width = (distanciaDots * slideIndex) + 'px';
}
function dotCheck() {
    for (let i = 0; i < dots.length; i++) {
        if (i < slideIndex) {
            dots[i].classList.add("dot-check")
        } else {
            dots[i].classList.remove("dot-check")
        }
    }
}

