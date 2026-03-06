// 1. Clase Producto (Mantenemos la escalabilidad)
class Producto {
    constructor(id, nombre, precio, calidad, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.calidad = calidad;
        this.img = img;
    }
}

// 2. Variables de estado y persistencia
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
const btnReset = document.getElementById("btn-reset");

// 4. Carga de productos mediante FETCH (Asincronía)
async function cargarProductos() {
    try {
        const response = await fetch('./productos.json');
        const data = await response.json();
        // Convertimos los datos planos en instancias de la clase Producto
        const productosInstanciados = data.map(p => new Producto(p.id, p.nombre, p.precio, p.calidad, p.img));
        imprimirProductosEnHTML(productosInstanciados);
    } catch (error) {
        mostrarMensaje("Error al cargar el catálogo de productos.");
    }
}

// 5. Función para actualizar interfaz y storage
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

// 6. Librería Toastify para mensajes rápidos
function mostrarMensaje(texto, color = "#d9534f") {
    Toastify({
        text: texto,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: color }
    }).showToast();
}

// 7. Lógica de Compra
function comprarProducto(producto) {
    if (presupuesto >= producto.precio) {
        presupuesto -= producto.precio;
        calidadTotal += producto.calidad;
        inventario.push(producto);
        
        mostrarMensaje(`Compraste: ${producto.nombre}`, "#28a745");
        actualizarInterfaz();
    } else {
        mostrarMensaje("Presupuesto insuficiente.");
    }
}

// 8. Renderizado dinámico con eventos
function imprimirProductosEnHTML(arrayProductos) {
    contenedorCards.innerHTML = "";
    arrayProductos.forEach(producto => {
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
        document.getElementById(`btn-${producto.id}`).addEventListener("click", () => comprarProducto(producto));
    });
}

// 9. Manejo de Formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputNombre = document.getElementById("input-nombre");
    if (inputNombre.value.trim() !== "") {
        nombreEstudio = inputNombre.value;
        actualizarInterfaz();
        mostrarMensaje("Estudio actualizado con éxito", "#1a1a1a");
        formulario.reset();
    }
});

// 10. Librería SweetAlert2 para la Grabación (Finalización)
btnGrabar.addEventListener("click", () => {
    if (calidadTotal >= 60) {
        Swal.fire({
            title: '¡HIT LOGRADO!',
            text: `Has producido un éxito mundial en ${nombreEstudio}. Tu equipo será reiniciado para el próximo proyecto.`,
            icon: 'success',
            confirmButtonText: 'Excelente'
        }).then(() => {
            // 1. Resetear las variables de memoria
            presupuesto = 5000;
            calidadTotal = 0;
            inventario.length = 0; // Vaciar array
            
            // 2. Actualizar la interfaz y el localStorage con estos nuevos valores
            actualizarInterfaz();
        });
    } else {
        Swal.fire({
            title: 'Falta calidad',
            text: `Tu estudio tiene ${calidadTotal} pts. Necesitas al menos 60.`,
            icon: 'error'
        });
    }
});

// 11. Reset del simulador
btnReset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

// Ejecución inicial
cargarProductos();
actualizarInterfaz();