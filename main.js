// 1. Clase para mejorar la escalabilidad (Sugerencia del profe)
class Producto {
    constructor(id, nombre, precio, calidad, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.calidad = calidad;
        this.img = img;
    }
}

// 2. Catálogo de productos (Instanciados mediante la clase)
const productos = [
    new Producto("mic01", "Micrófono Shure", 300, 15, "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=200&h=150"),
    new Producto("int01", "Interfaz Focusrite", 800, 30, "https://upload.wikimedia.org/wikipedia/commons/3/31/Focusrite_Scarlett_2i2%2C_2i4%2C_6i6_USB2.0_Audio_Interfaces_with_Focusrite_Mic_Preamps_-_2014_NAMM_Show_%28by_Matt_Vanacoro%29.jpg"),
    new Producto("mon01", "Monitores KRK", 1200, 50, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjEr2TrlFlSBgGeJqiPkukExqbFZ8faLCGg&s"),
    new Producto("con01", "Consola Analógica", 2500, 100, "https://http2.mlstatic.com/D_Q_NP_2X_756062-MLA80824639523_112024-T.webp")
];

// 3. Inicialización de estados desde LocalStorage
let presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || 5000;
let calidadTotal = JSON.parse(localStorage.getItem("calidadTotal")) || 0;
let nombreEstudio = localStorage.getItem("nombreEstudio") || "Mi Gran Estudio";
const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

// 4. Referencias al DOM
const contenedorCards = document.getElementById("cards-container");
const listaInventario = document.getElementById("lista-inventario");
const displayPresupuesto = document.getElementById("presupuesto-display");
const displayCalidad = document.getElementById("calidad-display");
const displayNombre = document.getElementById("nombre-estudio-display");
const btnGrabar = document.getElementById("btn-grabar");
const mensajesFooter = document.getElementById("mensajes-sistema");
const formulario = document.getElementById("formulario-inicio");
const btnReset = document.getElementById("btn-reset");

// 5. Función para actualizar la interfaz y guardar en Storage
function actualizarInterfaz() {
    displayPresupuesto.innerText = presupuesto;
    displayCalidad.innerText = calidadTotal;
    displayNombre.innerText = nombreEstudio;
    
    listaInventario.innerHTML = "";
    inventario.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = `${item.nombre} (+${item.calidad} pts)`;
        listaInventario.appendChild(li);
    });

    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
    localStorage.setItem("calidadTotal", JSON.stringify(calidadTotal));
    localStorage.setItem("inventario", JSON.stringify(inventario));
    localStorage.setItem("nombreEstudio", nombreEstudio);
}

function mostrarMensaje(texto) {
    mensajesFooter.innerText = texto;
}

// 6. Manejo del Formulario (Evento SUBMIT)
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputNombre = document.getElementById("input-nombre");
    if (inputNombre.value.trim() !== "") {
        nombreEstudio = inputNombre.value;
        actualizarInterfaz();
        mostrarMensaje("Nombre del estudio actualizado.");
        formulario.reset();
    }
});

// 7. Lógica de Compra con validación (Uso de RETURN)
function validarPresupuesto(precio) {
    return presupuesto >= precio;
}

function comprarProducto(producto) {
    if (validarPresupuesto(producto.precio)) {
        presupuesto -= producto.precio;
        calidadTotal += producto.calidad;
        inventario.push(producto);
        
        mostrarMensaje(`Has comprado ${producto.nombre} con éxito.`);
        actualizarInterfaz();
    } else {
        mostrarMensaje("Presupuesto insuficiente.");
    }
}

// 8. Generación dinámica de Cards
function imprimirProductosEnHTML(arrayProductos) {
    contenedorCards.innerHTML = "";

    for (const producto of arrayProductos) {
        const card = document.createElement("div");
        card.classList.add("card-estudio");
        
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Calidad: +${producto.calidad}</p>
            <button id="btn-${producto.id}">Comprar</button>
        `;
        
        contenedorCards.appendChild(card);

        const boton = document.getElementById(`btn-${producto.id}`);
        boton.addEventListener("click", () => comprarProducto(producto));
    }
}

// 9. Evento Especial (Grabar) + Vaciado de inventario (Sugerencia del profesor)
btnGrabar.addEventListener("click", () => {
    if (calidadTotal >= 60) {
        mostrarMensaje("¡HIT LOGRADO! El estudio ha sido un éxito. Reiniciando inventario para el próximo proyecto.");
        
        // Vaciamos el inventario y reseteamos calidad
        inventario.length = 0; 
        calidadTotal = 0;
        
        actualizarInterfaz();
    } else {
        mostrarMensaje(`Calidad insuficiente (${calidadTotal}/60).`);
    }
});

// 10. Función para reiniciar todo
btnReset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

// Ejecución inicial
imprimirProductosEnHTML(productos);
actualizarInterfaz();