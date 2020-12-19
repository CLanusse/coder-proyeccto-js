var servicios;
const cursosLista = document.getElementById('cursos__lista');
const cursosEnForm = document.getElementById('compra__cursos-contenedor');

fetch('/data/servicios.json').then((res) => {
    res.json().then((data)=>{

        servicios = data;
        
        // cursos index y botones
        servicios.forEach((curso)=> {
            cursosLista.innerHTML += `
            <li class="cursos__item">
            <h3 class="cursos__header">${curso.nombre}</h3>
            <div class="cursos__info">
            <p>${curso.desc}</p>
            <p class="cursos__precio">$${curso.precio}.-</p>
            </div>
            </li>
            `;

        // cursos en formulario compra
            cursosEnForm.innerHTML += `
            <label for="${curso.id}">${curso.nombre}<input type="checkbox" class="compra__servicio" id="${curso.id}"></label>
            <p class="compra__precio">$${curso.precio}.-</p>`;
        })
        var cursoAccBoton = document.getElementsByClassName("cursos__header");
        
        for (let boton of cursoAccBoton) {
            boton.addEventListener('click', ()=> {
                boton.parentElement.classList.toggle("cursos__item-active")
            })
        }
    })
    
})


// Objeto de carrito de compras - array de objetos-compra
class ResumenDeCompra {
    constructor () {
        this.listaCompras = [];
    }

    agregarDatosPersonales = () => {
        this.listaCompras = [] //reset del carrito
        let datosPersonales = new DatosPersonales(datosNombre.value, datosDni.value, datosTel.value, datosEmail.value);
        this.listaCompras.push(datosPersonales);
        //agrega array para los servicios
        this.listaCompras.push([])
        localStorage.setItem('carrito', JSON.stringify(this.listaCompras));
    }
    
    agregarServicios = (servicios) => {
        this.listaCompras[1] = servicios;
        localStorage.setItem('carrito', JSON.stringify(this.listaCompras));
    }

    precioFinal =  () => {
        let precioTotal = 0;
        for (let compra of this.listaCompras[1]) {
            precioTotal += compra.precio;
        }
        return precioTotal;
    }
    tomarDatosIniciales = function() {
        if (localStorage.getItem('carrito') != null) {
            this.listaCompras = JSON.parse(localStorage.getItem('carrito'));
        }
    }
}

// Objeto de compra, se agrega al carrito
class Servicio {
    constructor (producto, precio) {
        this.producto = producto;
        this.precio = precio;
    }
}
class DatosPersonales {
    constructor (nombre, dni, tel, email) {
        this.nombre = nombre;
        this.dni = dni;
        this.tel = tel;
        this.email = email;
    }
}

let resumenDeCompra = new ResumenDeCompra();

// ============
// Navegacion - Menu mobile
// ============

let botonMobileAbrir = $("#nav__mobile-abrir");
let botonMobileCerrar = $("#nav__mobile-cerrar");
let headerNavegacion = $(".header__nav");
let headerLinks = $(".navegacion__link");

botonMobileAbrir.click( () => {
    headerNavegacion.addClass("header__nav-active");
})
botonMobileCerrar.click( () => {
    headerNavegacion.removeClass("header__nav-active");
})
headerLinks.click( ()=> {
    headerNavegacion.removeClass("header__nav-active")
})

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
})
comprarCerrar.addEventListener('click', ()=> {
    modalComprar.classList.remove("comprar-active");
})
contenedorComprar.addEventListener('click', (e) => {
    e.stopPropagation();
})
modalComprar.addEventListener('click', ()=> {
    modalComprar.classList.remove("comprar-active");
})


// formulario slider

let slideIndex = 0;

const dots = document.getElementsByClassName('dot');
const autito = document.getElementById("autito");
const line = document.getElementById("line");

const formularioSlider = document.getElementById('formulario__compra');
const compraSlide = document.getElementsByClassName('compra__slide');

const datosNombre = document.getElementById("compra__nombre");
const datosDni = document.getElementById("compra__dni");
const datosTel = document.getElementById("compra__tel");
const datosEmail = document.getElementById("compra__email");

// botones
const botonSiguiente = document.getElementById('boton__siguiente');
const botonVolver = document.getElementById('boton__volver');

botonSiguiente.addEventListener('click', ()=> {  
    switch(slideIndex) {
        case 0:
            cargarDatosPersonales();
            break;
        case 1:
            cargarServicios();
            break;
        case 2:
            formSliderRight();
            break;
        case 3:
            formSliderRight();
            break;
        case 4:
            
            break;
        }
})

botonVolver.addEventListener('click', ()=> {
    switch(slideIndex) {
        case 0:
            comprarCerrar.click();
            break;
        case 1:
            formSliderLeft();
            break;
        case 2:
            formSliderLeft();
            break;
        case 3:
            formSliderLeft();
            break;
        case 4:
            formSliderLeft();
            break;
    }
})



function cargarDatosPersonales() {
    let datosCheck = checkDatosPersonales();
            if (datosCheck) {
                resumenDeCompra.agregarDatosPersonales();
                console.log(resumenDeCompra.listaCompras);
                formSliderRight();
            } else {
                console.log("nope")
            }
}

function cargarServicios() {
    let comprarCursos = [];
    let cursosCompra = document.getElementsByClassName('compra__servicio')
    for (curso of cursosCompra) {
        if (curso.checked) {
            servicios.forEach((servicio) => {
                if (servicio.id === curso.id) {
                    let compra = new Servicio(servicio.nombre, servicio.precio);
                    comprarCursos.push(compra)
                }
            })

        }
    }
    if (comprarCursos.length === 0) {
        // mostrar error
        console.log("asdfasdf")
    } else {
        resumenDeCompra.agregarServicios(comprarCursos);
        prepararPanelFechas();
        formSliderRight();
    }
}

function checkDatosPersonales() {
    let datosNombreValue = datosNombre.value.trim();
    let datosDniValue = datosDni.value.trim();
    let datosTelValue = datosTel.value.trim();
    let datosEmailValue = datosEmail.value.trim();

    let nombreCheck = false;
    let dniCheck = false;
    let telCheck = false;
    let emailCheck = false;

    datosNombre.classList.remove('input-error', 'input-success');
    datosDni.classList.remove('input-error', 'input-success');
    datosTel.classList.remove('input-error', 'input-success');
    datosEmail.classList.remove('input-error', 'input-success');

    if (datosNombreValue === '') {
        nombreCheck = inputError(datosNombre, 'Este campo no puede estar vacío')
    } else if (datosNombreValue.length < 4) {
        nombreCheck = inputError(datosNombre, 'Por favor ingrese su nombre completo')
    } else if (!isText(datosNombreValue)) {
        nombreCheck = inputError(datosNombre, 'El nombre ingresado no es válido')
    } else {
        nombreCheck = inputSuccess(datosNombre);
    }

    if (datosDniValue === '') {
        dniCheck = inputError(datosDni, 'Este campo no puede estar vacío');
    } else if (datosDniValue.length > 10 || datosDniValue.length < 6) {
        dniCheck = inputError(datosDni, 'DNI no válido. Ingrese sólo números, sin puntos o espacios.')
    } else {
        dniCheck = inputSuccess(datosDni);
    }

    if (datosTelValue === '') {
        telCheck = inputError(datosTel, 'Este campo no puede estar vacío')
    } else if (datosTelValue.length < 6) {
        telCheck = inputError(datosTel, 'El número ingresado no es válido')
    } else if (!isTel(datosTelValue)) {
        telCheck = inputError(datosTel, 'Ingrese sólo números, sin otros caracteres')
    } else {
        telCheck = inputSuccess(datosTel);
    }

    if (datosEmailValue === '') {
       emailCheck = inputError(datosEmail, 'Este campo no puede estar vacío')
    } else if (!isEmail(datosEmailValue)) {
        emailCheck = inputError(datosEmail, 'Formato de email no válido. Ejemplo: salerno@autoescuela.com')
    } else {
        emailCheck = inputSuccess(datosEmail);
    }

    if (nombreCheck && dniCheck && telCheck && emailCheck) {
        return true
    } else {
        return false
    }
}

function inputSuccess(input) {
    let small = input.nextElementSibling;
    input.classList.add('input-success');
    small.innerText = '';
    return true;
}
function inputError(input, mensaje) {
    let small = input.nextElementSibling;
    input.classList.add('input-error');
    small.innerText = mensaje;
    return false;
}

function isText(text) {
    return /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/.test(text);
}
function isEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}
function isTel(number) {
    for (caracter of number) {
        if (isNaN(caracter)) {
            return false
        }
    }
    return true;
}

function prepararPanelFechas() {
    const fechasManejo = document.getElementById('horarios__manejo');
    const fechasTeorico = document.getElementById('horarios__teorico');

    fechasManejo.classList.add('horarios-disabled');
    fechasTeorico.classList.add('horarios-disabled');
    
    resumenDeCompra.listaCompras[1].forEach((compra) => {
        if (compra.producto == 'Manejo básico' || compra.producto == 'Manejo avanzado') {
            fechasManejo.classList.remove('horarios-disabled')
        } else if (compra.producto == 'Mecánica básica' || compra.producto == 'Exámen teórico' || compra.producto == 'Gestor de trámites') {
            fechasTeorico.classList.remove('horarios-disabled')
        }
    })
}

function formSliderRight() {
    let size = compraSlide[0].clientWidth;
    slideIndex++;
    formularioSlider.style.transform = 'translateX(' + (-size * slideIndex) +'px)';

    autitoAvanzar();
    dotCheck()
}
function formSliderLeft() {
    let size = compraSlide[0].clientWidth;
    slideIndex--;
    formularioSlider.style.transform = 'translateX(' + (-size * slideIndex) +'px)';

    autitoVolver();
    dotCheck()
}

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

