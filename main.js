// 1. Catálogo de productos
const productos = [
    { id: "mic01", nombre: "Micrófono Shure", precio: 300, calidad: 15, img: "https://placehold.co/150x100?text=Microfono" },
    { id: "int01", nombre: "Interfaz Focusrite", precio: 800, calidad: 30, img: "https://placehold.co/150x100?text=Interfaz" },
    { id: "mon01", nombre: "Monitores KRK", precio: 1200, calidad: 50, img: "https://placehold.co/150x100?text=Monitores" },
    { id: "con01", nombre: "Consola Analógica", precio: 2500, calidad: 100, img: "https://placehold.co/150x100?text=Consola" }
];

// 2. Inicialización de estados desde LocalStorage
let presupuesto = JSON.parse(localStorage.getItem("presupuesto")) || 5000;
let calidadTotal = JSON.parse(localStorage.getItem("calidadTotal")) || 0;
let nombreEstudio = localStorage.getItem("nombreEstudio") || "Mi Gran Estudio";
const inventario = JSON.parse(localStorage.getItem("inventario")) || [];

// 3. Referencias al DOM
const contenedorCards = document.getElementById("cards-container");
const listaInventario = document.getElementById("lista-inventario");
const displayPresupuesto = document.getElementById("presupuesto-display");
const displayCalidad = document.getElementById("calidad-display");
const displayNombre = document.getElementById("nombre-estudio-display");
const btnGrabar = document.getElementById("btn-grabar");
const mensajesFooter = document.getElementById("mensajes-sistema");
const formulario = document.getElementById("formulario-inicio");

// 4. Función para actualizar la interfaz y guardar en Storage
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

// 5. Manejo del Formulario (Evento SUBMIT)
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

// 6. Lógica de Compra con validación (Uso de RETURN)
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

// 7. Generación dinámica de Cards
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

// 8. Evento Especial (Grabar)
btnGrabar.addEventListener("click", () => {
    if (calidadTotal >= 60) {
        mostrarMensaje("¡HIT LOGRADO! Tu estudio ya es profesional.");
    } else {
        mostrarMensaje(`Calidad insuficiente (${calidadTotal}/60).`);
    }
});

// Ejecución inicial
imprimirProductosEnHTML(productos);
actualizarInterfaz();