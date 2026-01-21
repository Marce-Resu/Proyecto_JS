// --- VARIABLES Y CONSTANTES ---
const PRECIO_HORA_GRABACION = 500;
let presupuestoEstudio = 5000;
let nombreEstudio = "";
const inventarioComprado = []; // Array para listar el inventario adquirido

// --- FUNCIONES ---

// 1. Función de Inicio (Entrada de datos)
function iniciarSimulador() {
    nombreEstudio = prompt("Bienvenido al Music Studio Manager.\n¿Cómo se llamará tu estudio?");
    
    if (nombreEstudio === "" || nombreEstudio === null) {
        nombreEstudio = "Estudio Genérico";
    }
    
    console.log("--- Reporte Inicial ---");
    console.log("Estudio: " + nombreEstudio);
    console.log("Presupuesto inicial: $" + presupuestoEstudio);
    
    alert("¡Bienvenido " + nombreEstudio + "!\nTu presupuesto inicial es de $" + presupuestoEstudio);
    menuPrincipal();
}

// 2. Función de Procesamiento (Lógica y Ciclos)
function mostrarCatalogo() {
    // Array de objetos para demostrar manejo de datos
    const productos = [
        { id: 1, nombre: "Micrófono Shure", precio: 300 },
        { id: 2, nombre: "Interfaz de Audio", precio: 800 },
        { id: 3, nombre: "Monitores de Estudio", precio: 1200 }
    ];

    let mensaje = "Equipos disponibles:\n";
    
    // Ciclo de iteración para recorrer el catálogo
    for (const producto of productos) {
        mensaje += producto.id + ". " + producto.nombre + " ($" + producto.precio + ")\n";
    }
    
    let eleccion = prompt(mensaje + "4. Volver\n\nIndique el número del producto que desea comprar:");
    
    if (eleccion === "1") realizarCompra(productos[0].nombre, productos[0].precio);
    else if (eleccion === "2") realizarCompra(productos[1].nombre, productos[1].precio);
    else if (eleccion === "3") realizarCompra(productos[2].nombre, productos[2].precio);
    else menuPrincipal();
}

// 3. Función de Salida (Resultados)
function realizarCompra(nombre, precio) {
    if (presupuestoEstudio >= precio) {
        presupuestoEstudio -= precio;
        inventarioComprado.push(nombre); // Agregamos al array
        
        // Salida por Alert y Consola
        alert("¡Compra exitosa!\nHas adquirido: " + nombre + "\nSaldo restante: $" + presupuestoEstudio);
        console.log("Nueva compra: " + nombre + ". Saldo actual: $" + presupuestoEstudio);
        console.log("Inventario actualizado: ", inventarioComprado);
    } else {
        alert("Fondos insuficientes para comprar " + nombre);
    }
    menuPrincipal();
}

function menuPrincipal() {
    let seleccion = prompt(
        "ESTUDIO: " + nombreEstudio.toUpperCase() + "\n" +
        "Presupuesto: $" + presupuestoEstudio + "\n\n" +
        "1. Comprar Equipamiento\n" +
        "2. Ver Inventario en Consola\n" +
        "3. Salir"
    );

    if (seleccion === "1") {
        mostrarCatalogo();
    } else if (seleccion === "2") {
        alert("Revisa la consola (F12) para ver tu inventario detallado.");
        console.log("--- Inventario de " + nombreEstudio + " ---");
        if (inventarioComprado.length === 0) {
            console.log("El inventario está vacío.");
        } else {
            inventarioComprado.forEach((item, index) => {
                console.log((index + 1) + ". " + item);
            });
        }
        menuPrincipal();
    } else if (seleccion === "3") {
        alert("Gracias por usar Music Studio Manager. ¡Sigue creando hits!");
    } else {
        alert("Opción no válida.");
        menuPrincipal();
    }
}

// Invocación de la función principal
iniciarSimulador();