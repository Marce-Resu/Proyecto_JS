// --- VARIABLES Y CONSTANTES ---
let presupuestoEstudio = 5000;
let nombreEstudio = "";
let calidadSonido = 0; 
const inventarioComprado = []; 

// --- FUNCIONES ---

// 1. Función con RETURN (Procesamiento)
function validarPresupuesto(precio) {
    return presupuestoEstudio >= precio; // Devuelve true o false directamente
}

// 2. Función de Acción
function realizarCompra(nombre, precio, calidad) {
    if (validarPresupuesto(precio)) {
        presupuestoEstudio -= precio;
        calidadSonido += calidad;
        inventarioComprado.push(nombre);
        
        alert("¡Compra exitosa!\nHas adquirido: " + nombre + 
              "\nCalidad de estudio actual: " + calidadSonido + " pts");
        
        console.log("Nueva compra: " + nombre + ". Saldo: $" + presupuestoEstudio);
    } else {
        alert("No tienes fondos suficientes para " + nombre);
    }
}

// 3. Función de Catálogo (CORREGIDA)
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

    // Usamos un Switch simple para evitar el error de referencia
    switch (eleccion) {
        case "1":
            realizarCompra(productos[0].nombre, productos[0].precio, productos[0].calidad);
            break;
        case "2":
            realizarCompra(productos[1].nombre, productos[1].precio, productos[1].calidad);
            break;
        case "3":
            realizarCompra(productos[2].nombre, productos[2].precio, productos[2].calidad);
            break;
        case "4":
            // No hace nada, vuelve al ciclo principal
            break;
        default:
            alert("Opción no válida en el catálogo.");
            break;
    }
}

// 4. Función Principal con CICLO (Evita recursión)
function iniciarSimulador() {
    nombreEstudio = prompt("Bienvenido al Music Studio Manager.\n¿Cómo se llamará tu estudio?");
    if (!nombreEstudio) nombreEstudio = "Estudio Pro";

    alert("¡Bienvenido " + nombreEstudio + "!\nPresupuesto: $" + presupuestoEstudio);

    let continuar = true;

    while (continuar) {
        let seleccionMenu = prompt(
            "ESTUDIO: " + nombreEstudio.toUpperCase() + "\n" +
            "Saldo: $" + presupuestoEstudio + " | Calidad: " + calidadSonido + " pts\n\n" +
            "1. Comprar Equipamiento\n" +
            "2. Ver Inventario en Consola\n" +
            "3. Grabar Single (Requiere 60 de calidad)\n" +
            "4. Salir"
        );

        switch (seleccionMenu) {
            case "1":
                mostrarCatalogo();
                break;
            case "2":
                console.log("--- Inventario de " + nombreEstudio + " ---");
                if (inventarioComprado.length === 0) {
                    console.log("Aún no has comprado equipo.");
                } else {
                    console.table(inventarioComprado);
                }
                alert("Inventario impreso en consola (F12).");
                break;
            case "3":
                if (calidadSonido >= 60) {
                    alert("¡ÉXITO! Tu estudio tiene calidad suficiente (" + calidadSonido + " pts) para grabar un hit mundial.");
                } else {
                    alert("Aún no tienes equipo suficiente. Te faltan " + (60 - calidadSonido) + " pts de calidad.");
                }
                break;
            case "4":
                alert("Guardando sesión... ¡Hasta pronto!");
                continuar = false; 
                break;
            default:
                alert("Opción no válida.");
                break;
        }
    }
}

// Invocación
iniciarSimulador();