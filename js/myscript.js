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
            <p class="cursos__precio">Precio: $${curso.precio}.-</p>
            </div>
            </li>
            `;

        let cursoAccBoton = document.getElementsByClassName("cursos__header");
        for (let boton of cursoAccBoton) {
            boton.addEventListener('click', ()=> {
                boton.parentElement.classList.toggle("cursos__item-active")
            })
        }

        // cursos en formulario compra
            cursosEnForm.innerHTML += `
            <label for="${curso.id}">${curso.nombre}<input type="checkbox" class="compra__servicio" id="${curso.id}"></label>
            <p class="compra__precio">$${curso.precio}.-</p>`;
        })
        
        let formServicios = document.getElementsByClassName('compra__servicio')
        let formPrecios = document.getElementsByClassName('compra__precio');
        for (let i = 0; i < formServicios.length; i++) {
            formServicios[i].addEventListener('change', () => {
                if (formServicios[i].checked) {
                    formPrecios[i].style.opacity = '1';
                } else {
                    formPrecios[i].style.opacity = '.3'
                }
            })
        }   
        
        resumenDeCompra.tomarDatosIniciales();
    })  
})

// Objeto de carrito de compras - array datos personales más servicios adquiridos
class ResumenDeCompra {
    constructor () {
        this.listaCompras = [];
    }

    agregarDatosPersonales = () => {
        this.listaCompras = [] //reset del carrito
        let datosPersonales = new DatosPersonales(datosNombre.value, datosDni.value, datosTel.value, datosEmail.value);
        this.listaCompras.push(datosPersonales);
        localStorage.setItem('carrito', JSON.stringify(this.listaCompras));
    }
    
    agregarServicios = (servicios) => {
        //agrega array para los servicios y evita duplicacion
        if (this.listaCompras.length > 1) {
            this.listaCompras = this.listaCompras.slice(0, 1)
        }
        this.listaCompras.push([])
        this.listaCompras[1] = servicios;
        localStorage.setItem('carrito', JSON.stringify(this.listaCompras));
    }
    
    agregarHorarios = (horarios) => {
        //agrega array para horarios y evita duplicacion
        if (this.listaCompras.length > 2) {
            this.listaCompras = this.listaCompras.slice(0, 2)
        }
        this.listaCompras.push([]);
        this.listaCompras[2] = horarios;
        localStorage.setItem('carrito', JSON.stringify(this.listaCompras));
    }
    precioFinal = () => {
        let precioTotal = 0;
        for (let compra of this.listaCompras[1]) {
            precioTotal += compra.precio;
        }
        return precioTotal;
    }
    tomarDatosIniciales = () => {
        if (localStorage.getItem('carrito') != null) {
            this.listaCompras = JSON.parse(localStorage.getItem('carrito'));
            continuarCompraPendiente();
        }
    }
}
class Horario {
    constructor (curso, horario) {
        this.curso = curso;
        this.horario = horario;
    }
}
class Servicio {
    constructor (producto, precio, id) {
        this.producto = producto;
        this.precio = precio;
        this.id = id;
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

const contactoForm = document.getElementById("formulario-contacto");
const contactoNombre = document.getElementById("contacto-nombre");
const contactoEmail = document.getElementById("contacto-email");
const contactoTelefono = document.getElementById("contacto-telefono");
const contactoMensaje = document.getElementById("contacto-mensaje");
const contactoEnviar = document.getElementById("formulario__enviar");
const modalGracias = document.getElementById("modal__gracias")

contactoEnviar.addEventListener('click', (e)=> {
    e.preventDefault();
    let contactoCheck = checkDatosContacto();
    if (contactoCheck) {
        mostrarModalGracias();
    }
})


// =================
// FROMULARIO COMPRA
// =================

const comprarAbrir = document.getElementById('comprar-abrir');
const comprarCerrar = document.getElementById('comprar-cerrar');
const modalComprar = document.getElementById('comprar');
const contenedorComprar = document.getElementById('contenedor__compra')
const modalSuccess = document.getElementById('compra__modal-success');

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
modalSuccess.addEventListener('click', (e)=> {
    e.stopPropagation();
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

const horariosInputs = document.getElementsByClassName('horarios__input');

const resumenDatos = document.getElementById('resumen__datos');
const resumenServicios = document.getElementById('resumen__servicios');
const resumenPrecio = document.getElementById('resumen__precio');
// botones
const botonSiguiente = document.getElementById('boton__siguiente');
const botonVolver = document.getElementById('boton__volver');
const botonSuccess = document.getElementById('compra__boton-success');

// Eventos del form
botonSiguiente.addEventListener('click', ()=> {  
    switch(slideIndex) {
        case 0:
            cargarDatosPersonales();
            break;
        case 1:
            cargarServicios();
            break;
        case 2:
            cargarHorarios();
            break;
        case 3:
            cargarEntrevista();
            break;
        case 4:
            mostrarModalConfirmar();
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
            for (input of horariosInputs) {
                input.checked = false;
            }  
            break;
        case 3:
            formSliderLeft();
            break;
        case 4:
            formSliderLeft();
            recuperarBotonSiguiente();
            resumenServicios.innerHTML = '';
            break;
    }
})

botonSuccess.addEventListener('click', ()=> {
    confirmarCompra();
})

formularioSlider.addEventListener('transitionend', ()=>{
    if (slideIndex === 4) {
        generarBotonConfirmar();
    }
})
// Calendly API

let calendlyAgendado = false;
window.addEventListener('message', function(e) {
      if (isCalendlyEvent(e)) {
        if (e.data.event === 'calendly.event_scheduled') {
            calendlyAgendado = true;
            calendlyConfirmado();
        }
      }
    }
)
function isCalendlyEvent(e) {
    return e.data.event &&
           e.data.event.indexOf('calendly') === 0;
}



// =========
// FUNCIONES
// =========
function cargarDatosPersonales() {
    let datosCheck = checkDatosPersonales();
            if (datosCheck) {
                resumenDeCompra.agregarDatosPersonales();
                setTimeout(formSliderRight, 400);
            }
}

function cargarServicios() {
    let comprarCursos = [];
    let cursosCompra = document.getElementsByClassName('compra__servicio')
    for (curso of cursosCompra) {
        if (curso.checked) {
            servicios.forEach((servicio) => {
                if (servicio.id === curso.id) {
                    let compra = new Servicio(servicio.nombre, servicio.precio, servicio.id);
                    comprarCursos.push(compra)
                }
            })
        }
    }

    let small = document.getElementById('compra__cursos-error');
    if (comprarCursos.length === 0) {
        // mostrar error
        small.innerText = 'Elige al menos una opción';
    } else {
        small.innerText = '';
        resumenDeCompra.agregarServicios(comprarCursos);
        prepararPanelFechas();
        setTimeout(formSliderRight, 300);   
    }
}

function cargarHorarios() {
    let horariosCursos = [];
    for (input of horariosInputs) {
        if (input.checked) {
            let horario = new Horario(input.name, input.value)
            horariosCursos.push(horario)
        }
    }    
    let minLength = calcularLengthHorarios();
    
    let small = document.getElementById('compra__horarios-error');
    if (horariosCursos.length === 0) {
        // mostrar error
        small.innerText = 'Elige al menos una opción';
    } else if (horariosCursos.length < minLength) {
        small.innerText = 'Te falta elegir una opción';
    } else {
        small.innerText = '';
        resumenDeCompra.agregarHorarios(horariosCursos);
        setTimeout(formSliderRight, 300);
    }
}

function cargarEntrevista() {
    let small = document.getElementById('entrevista-error');
    if (calendlyAgendado === true) {
        small.innerText = '';
        // crearResumenCompra();
        // setTimeout(formSliderRight, 200);
    } else {
        small.innerText = '*Debes agendar tu entrevista'
    }
    // movido solo para prueba
    crearResumenCompra();
    setTimeout(formSliderRight, 200)
}

function mostrarModalConfirmar() {
    autitoFade();
    setTimeout(()=> {
        modalComprar.classList.add('comprar-success')
    }, 800)
    modalComprar.addEventListener('click', ()=> {
        modalComprar.classList.add("comprar-active");
    })
}

function calendlyConfirmado() {
    let calendlyButton = document.getElementsByClassName('calendly__btn');
    calendlyButton[0].innerText = '¡Confirmado!';
    calendlyButton[0].classList.add('calendly__btn-success')
}

function calcularLengthHorarios() {
    let manejo = false;
    let teorico = false;

    resumenDeCompra.listaCompras[1].forEach((compra) => {
        if (compra.producto === 'Manejo básico' || compra.producto === 'Manejo avanzado') {
            manejo = true;
        } else {
            teorico = true;
        }
    })

    if (manejo && teorico) {
        return 2
    } else {
        return 1
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

function crearResumenCompra() {
    let codeDatos = `
        <p>${resumenDeCompra.listaCompras[0].nombre}</p>
        <p>DNI ${resumenDeCompra.listaCompras[0].dni}</p>
        <p>Tel: ${resumenDeCompra.listaCompras[0].tel}</p>
        <p>${resumenDeCompra.listaCompras[0].email}</p>`;

    resumenDatos.innerHTML = codeDatos;

    let serviciosComprados = resumenDeCompra.listaCompras[1];
    serviciosComprados.forEach((servicio) => {
        let codeServicios = `<div>
                            <p>${servicio.producto}</p>
                            <p>$${servicio.precio}.-</p>
                        </div>`;
        resumenServicios.innerHTML += codeServicios;
    })

    let precioFinal = resumenDeCompra.precioFinal();
    resumenPrecio.innerHTML = `Precio total: $${precioFinal}.-`
}

function prepararPanelFechas() {
    const fechasManejo = document.getElementById('horarios__manejo');
    const fechasTeorico = document.getElementById('horarios__teorico');

    fechasManejo.classList.add('horarios-disabled');
    fechasTeorico.classList.add('horarios-disabled');
    
    resumenDeCompra.listaCompras[1].forEach((compra) => {
        if (compra.producto == 'Manejo básico' || compra.producto == 'Manejo avanzado') {
            fechasManejo.classList.remove('horarios-disabled')
        } else {
            fechasTeorico.classList.remove('horarios-disabled')
        }
    })
}

function formSliderRight() {
    let size = compraSlide[0].clientWidth;
    slideIndex++;
    formularioSlider.style.transform = 'translateX(' + (-size * slideIndex) +'px)';

    moverAutito();
    dotCheck()
}
function formSliderLeft() {
    let size = compraSlide[0].clientWidth;
    slideIndex--;
    formularioSlider.style.transform = 'translateX(' + (-size * slideIndex) +'px)';

    moverAutito();
    dotCheck()
}

function moverAutito() {
    let distanciaDots = (Math.floor(dots[1].getBoundingClientRect().left)) - (Math.floor(dots[0].getBoundingClientRect().left))
    autito.style.transform = 'translateX(' + (distanciaDots * slideIndex) + 'px)';
    line.style.width = (distanciaDots * slideIndex) + 'px';

}

function autitoFade() {
    autito.style.opacity = '0';
    for (dot of dots) {
        dot.classList.add("dot-check")
    }
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

function generarBotonConfirmar () {
    botonSiguiente.classList.add('compra__boton-confirmar');
    botonSiguiente.innerText = 'Confirmar';
}
function recuperarBotonSiguiente () {
    botonSiguiente.classList.remove('compra__boton-confirmar');
    botonSiguiente.innerText = 'Siguiente';
}

function confirmarCompra() {
    //reset del form
    modalComprar.classList.remove('comprar-success', 'comprar-active');
    autito.style.opacity = '1';
    slideIndex = 1;
    formSliderLeft();
    restablecerInputs();
    recuperarBotonSiguiente();
    recuperarBotonCalendly();

    //submit del form, se haria si hay backend
    // formularioSlider.submit()

    localStorage.removeItem('carrito');

    modalComprar.addEventListener('click', ()=> {
        modalComprar.classList.remove("comprar-active");
    })
}

function recuperarBotonCalendly() {
    calendlyAgendado = false;
    let calendlyButton = document.getElementsByClassName('calendly__btn');
    calendlyButton[0].innerText = 'Agendar llamado';
    calendlyButton[0].classList.remove('calendly__btn-success');

}
function restablecerInputs() {
    datosNombre.value = '';
    datosDni.value = '';
    datosTel.value = '';
    datosEmail.value = '';

    datosNombre.classList.remove('input-error', 'input-success');
    datosDni.classList.remove('input-error', 'input-success');
    datosTel.classList.remove('input-error', 'input-success');
    datosEmail.classList.remove('input-error', 'input-success');

    let cursosCompra = document.getElementsByClassName('compra__servicio')
    for (curso of cursosCompra) {
        curso.checked = false;
    }
    let formPrecios = document.getElementsByClassName('compra__precio');
    for (precio of formPrecios) {
        precio.style.opacity = '.3';
    }
    for (input of horariosInputs) {
        input.checked = false;
    }

    resumenDatos.innerHTML = '';
    resumenServicios.innerHTML = '';
    resumenPrecio.innerHTML = '';

    
}

function continuarCompraPendiente() {
    switch (resumenDeCompra.listaCompras.length) {
        case 1:
            recuperarDatos();
            break;
        case 2:
            recuperarDatos();
            recuperarServicios();
            break;
        case 3:
            recuperarDatos();
            recuperarServicios();
            recuperarHorarios();
            break;
        }
}

function recuperarDatos() {
    let datos = resumenDeCompra.listaCompras[0];
    datosNombre.value = datos.nombre;
    datosDni.value = datos.dni;
    datosTel.value = datos.tel;
    datosEmail.value = datos.email;
    formSliderRight();
}
function recuperarServicios() {
    let comprados = resumenDeCompra.listaCompras[1];
    let formServicios = document.getElementsByClassName('compra__servicio')
    comprados.forEach((compra) => {
        for (servicio of formServicios) {
            if (compra.id === servicio.id) {
                servicio.click();
            }
        }
    })
    prepararPanelFechas();
    formSliderRight();
}
function recuperarHorarios() {
    let horariosGuardados = resumenDeCompra.listaCompras[2];
    horariosGuardados.forEach((horario) => {
        for (input of horariosInputs) {
            if (horario.horario === input.value) {
                input.click();
            }
        }
    })
    formSliderRight();
}

function checkDatosContacto() {
        let contactoNombreValue = contactoNombre.value.trim();
        let contactoTelValue = contactoTelefono.value.trim();
        let contactoEmailValue = contactoEmail.value.trim();
        let contactoMensajeValue = contactoMensaje.value.trim();

        let nombreCheck = false;
        let telCheck = false;
        let emailCheck = false;
        let mensajeCheck = false;

        contactoNombre.classList.remove('input-error', 'input-success');
        contactoTelefono.classList.remove('input-error', 'input-success');
        contactoEmail.classList.remove('input-error', 'input-success');
        contactoMensaje.classList.remove('input-error', 'input-success');

        if (contactoNombreValue === '') {
            nombreCheck = inputError(contactoNombre, 'Este campo no puede estar vacío')
        } else if (!isText(contactoNombreValue)) {
            nombreCheck = inputError(contactoNombre, 'El nombre ingresado no es válido')
        } else {
            nombreCheck = inputSuccess(contactoNombre);
        }
        
        if (contactoTelValue === '') {
            telCheck = inputError(contactoTelefono, 'Este campo no puede estar vacío')
        } else if (contactoTelValue.length < 6) {
            telCheck = inputError(contactoTelefono, 'El número ingresado no es válido')
        } else if (!isTel(contactoTelValue)) {
            telCheck = inputError(contactoTelefono, 'Ingrese sólo números, sin otros caracteres')
        } else {
            telCheck = inputSuccess(contactoTelefono);
        }
        
        if (contactoEmailValue === '') {
            emailCheck = inputError(contactoEmail, 'Este campo no puede estar vacío')
        } else if (!isEmail(contactoEmailValue)) {
            emailCheck = inputError(contactoEmail, 'Formato de email no válido. Ejemplo: salerno@autoescuela.com')
        } else {
            emailCheck = inputSuccess(contactoEmail);
        }
        
        if (contactoMensajeValue === '') {
            mensajeCheck = inputError(contactoMensaje, 'Este campo no puede estar vacío')
        } else {
            mensajeCheck = inputSuccess(contactoMensaje);
        }

        if (nombreCheck && emailCheck && telCheck && mensajeCheck) {
            return true
        } else {
            return false
        }
}

function mostrarModalGracias() {
    modalGracias.style.visibility = 'visible';
    modalGracias.style.opacity = '1';

    modalGracias.addEventListener('click', ()=>{
        modalGracias.style.opacity = '0';
        modalGracias.style.visibility = 'hidden';
        setTimeout(()=>{
            contactoForm.submit()
        }, 500)
    })
}