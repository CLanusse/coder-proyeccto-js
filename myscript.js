
// Objeto de carrito de compras - array de objetos-compra
class CarritoDeCompras {
    constructor () {
        this.listaCompras = [];
        this.agregarCompra = function(compra) {
            this.listaCompras.push(compra);
            localStorage.setItem('carrito', JSON.stringify(this.listaCompras));
        }
        this.tomarDatosIniciales = function() {
            if (localStorage.getItem('carrito') != null) {
                this.listaCompras = JSON.parse(localStorage.getItem('carrito'));
            }
        }
    }
}

// Objeto de compra, se agrega al carrito
class Compra {
    constructor (producto, precio) {
        this.producto = producto;
        this.precio = precio;
    }
}

var nuevoCarritoDeCompras = new CarritoDeCompras;
nuevoCarritoDeCompras.tomarDatosIniciales();

// funcion para calcular precio total de los productos 
function precioFinal(carrito) {
    let precioTotal = 0;
    for (let compra of carrito.listaCompras) {
        precioTotal += compra.precio;
    }
    return precioTotal;
}

// ejemplos para chequear la funcionalidad

// var nuevaCompra = new Compra('Manejo basico', 8500);
// nuevoCarritoDeCompras.agregarCompra(nuevaCompra);
// nuevaCompra = new Compra('Gestor', 2500);
// nuevoCarritoDeCompras.agregarCompra(nuevaCompra);
// console.log(nuevoCarritoDeCompras.listaCompras);
// console.log(precioFinal(nuevoCarritoDeCompras));