// --- VARIABLES Y CONSTANTES ---
let presupuestoEstudio = 5000;
let nombreEstudio = "";
let calidadSonido = 0; // <--- Nueva funcionalidad exclusiva
const inventarioComprado = []; 

// --- FUNCIONES ---

// 1. Función con RETURN (Procesamiento de datos)
// Esta función ahora devuelve un valor para ser usado en otra parte
function validarPresupuesto(precio) {
    if (presupuestoEstudio >= precio) {
        return true; 
    } else {
        return false;
    }
}

// 2. Función de Salida y Acción
function realizarCompra(producto) {
    // Usamos el return de la función anterior
    if (validarPresupuesto(producto.precio)) {
        presupuestoEstudio -= producto.precio;
        calidadSonido += producto.calidad; // Sumamos calidad
        inventarioComprado.push(producto.nombre);
        
        alert("¡Compra exitosa!\nHas adquirido: " + producto.nombre + 
              "\nCalidad de estudio actual: " + calidadSonido + " pts");
        
        console.log("Nueva compra: " + producto.nombre + ". Saldo: $" + presupuestoEstudio);
        return true;
    } else {
        alert("Fondos insuficientes para comprar " + producto.nombre);
        return false;
    }
}

// 3. Función de Catálogo
function mostrarCatalogo() {
    const productos = [
        { id: 1, nombre: "Micrófono Shure", precio: 300, calidad: 15 },
        { id: 2, nombre: "Interfaz de Audio", precio: 800, calidad: 30 },
        { id: 3, nombre: "Monitores de Estudio", precio: 1200, calidad: 50 }
    ];

    let mensaje = "Equipos disponibles:\n";
    for (const p of productos) {
        mensaje += p.id + ". " + p.nombre + " ($" + p.precio + ") [+" + p.calidad + " calidad]\n";
    }
    
    let eleccion = prompt(mensaje + "4. Volver\n\nIndique el número del producto:");
    
    // Buscamos el producto según la elección
    let seleccionado = productos.find(p => p.id == eleccion);
    
    if (seleccion) {
        realizarCompra(seleccion);
    }
}

// 4. Función de Inicio y Menú Principal con CICLO (Evita recursión)
function iniciarSimulador() {
    nombreEstudio = prompt("Bienvenido al Music Studio Manager.\n¿Cómo se llamará tu estudio?");
    if (!nombreEstudio) nombreEstudio = "Estudio Pro";

    alert("¡Bienvenido " + nombreEstudio + "!\nPresupuesto: $" + presupuestoEstudio);

    let continuar = true;

    // Usamos un ciclo WHILE en lugar de llamar a la función de nuevo
    while (continuar) {
        let seleccion = prompt(
            "ESTUDIO: " + nombreEstudio.toUpperCase() + "\n" +
            "Saldo: $" + presupuestoEstudio + " | Calidad: " + calidadSonido + " pts\n\n" +
            "1. Comprar Equipamiento\n" +
            "2. Ver Inventario en Consola\n" +
            "3. Grabar Single (Requiere 60 de calidad)\n" +
            "4. Salir"
        );

        switch (seleccion) {
            case "1":
                mostrarCatalogo();
                break;
            case "2":
                console.log("--- Inventario Actual ---");
                console.table(inventarioComprado);
                alert("Inventario impreso en consola.");
                break;
            case "3":
                // Funcionalidad exclusiva del rubro musical
                if (calidadSonido >= 60) {
                    alert("¡ÉXITO! Tu estudio tiene calidad suficiente (" + calidadSonido + " pts) para grabar un hit.");
                } else {
                    alert("Aún no tienes equipo suficiente para sonar profesional. Te faltan " + (60 - calidadSonido) + " pts de calidad.");
                }
                break;
            case "4":
                alert("Guardando sesión... ¡Hasta pronto!");
                continuar = false; // Corta el ciclo y finaliza el programa
                break;
            default:
                alert("Opción no válida.");
                break;
        }
    }
}

// Invocación única
iniciarSimulador();