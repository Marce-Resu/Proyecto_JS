# Music Studio Manager 🎧

Este es mi proyecto final para el curso de JavaScript. El objetivo fue crear una aplicación web interactiva que simula la gestión de un estudio de grabación, permitiendo al usuario configurar su propio espacio, comprar equipamiento y alcanzar metas de calidad para "grabar un hit".

## 🚀 ¿Qué hace la aplicación?

El simulador permite:

  . Personalización: Nombrar tu propio estudio desde el inicio.

  . Gestión de presupuesto: Comprar equipamiento técnico (micrófonos, consolas, monitores) viendo cómo se     descuenta el dinero en tiempo real.

  . Proceso completo: Al acumular 60 puntos de calidad, el usuario puede "Grabar un Hit", lo que finaliza el ciclo y reinicia el inventario para comenzar un nuevo proyecto.

  . Persistencia: Todo el progreso (presupuesto, inventario y nombre) se guarda en el navegador, así que no se pierde si refrescás la página.

## 🛠️ Herramientas utilizadas

- **JavaScript ES6+**: Uso de clases para los productos, desestructuración y funciones asíncronas.
- **Fetch & JSON**: El catálogo de productos no está escrito en el JS, sino que se carga de forma asíncrona desde un archivo productos.json.
- **LocalStorage**: Para que los datos persistan entre sesiones.
- **DOM & Eventos**: Manipulación dinámica de la interfaz sin recargar la página.
- **Librerías externas**:
    - SweetAlert2: Para las alertas de éxito al grabar el hit.
    - Toastify: Para las notificaciones rápidas de compra.

## 🧠 Conceptos aplicados
Para esta entrega final me enfoqué en el manejo de datos asíncronos y la experiencia de usuario (UX).

1. **Programación Orientada a Objetos (POO)**: Organicé el catálogo usando una clase Producto, lo que hace que sea mucho más fácil agregar nuevos ítems a futuro.
2. **Asincronía**: El uso de async/await permite que los datos carguen de forma ordenada y profesional.
3. **Control de flujo**: Implementé el proceso de "finalización de compra/grabación" sincronizando la memoria RAM con el almacenamiento local, para que el simulador siempre esté limpio para una nueva sesión.


## 📋 Instrucciones
1. Ingresa el nombre de tu estudio en el formulario superior.
2. Navega por el catálogo y selecciona los equipos que desees comprar.
3. Observa tu inventario y estadísticas en tiempo real.
4. Al llegar a 60 puntos de calidad, presiona "Grabar Single". Al grabar un hit, el equipo se considera amortizado y el inventario se reiniciará para un nuevo proyecto.