
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

//=============
// Validar form
//=============

var contactoNombre = document.getElementById("contacto-nombre");
var contactoEmail = document.getElementById("contacto-email");
var contactoTelefono = document.getElementById("contacto-telefono");
var contactoMensaje = document.getElementById("contacto-mensaje");


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
    if (contactoEmail.value.indexOf("@") == -1 | contactoEmail.value.indexOf(".") == -1) {
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


