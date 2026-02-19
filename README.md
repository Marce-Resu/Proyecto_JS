# Music Studio Manager 🎧

Simulador interactivo para la gestión de presupuesto y equipamiento técnico de un estudio de grabación musical.

## 🚀 Funcionalidad
El proyecto permite al usuario bautizar su propio estudio y adquirir equipamiento profesional (micrófonos, interfaces, consolas). Cada compra descuenta dinero del presupuesto inicial y suma "puntos de calidad". El objetivo es alcanzar los 60 puntos de calidad para poder "Grabar un Hit".

## 🛠️ Herramientas utilizadas
- **HTML5 & CSS3**: Estructura semántica y diseño responsivo.
- **JavaScript (Vanilla)**: Lógica de negocio y manipulación del DOM.
- **Local Storage**: Persistencia de datos para mantener el estado del estudio al recargar la página.
- **JSON**: Serialización de datos para almacenamiento.

## 🧠 Conceptos aplicados
1. **Programación Orientada a Objetos (POO)**: Uso de clases para definir la estructura de los productos.
2. **DOM Dinámico**: Creación de elementos de interfaz a partir de arrays de objetos.
3. **Eventos**: Manejo de interacciones del usuario mediante `addEventListener`.
4. **Flujo Asincrónico Controlado**: Uso de `preventDefault` para el manejo de formularios.

## 📋 Instrucciones
1. Ingresa el nombre de tu estudio en el formulario superior.
2. Navega por el catálogo y selecciona los equipos que desees comprar.
3. Observa tu inventario y estadísticas en tiempo real.
4. Al llegar a 60 puntos de calidad, presiona "Grabar Single". ¡Ten cuidado! Al grabar un hit, el equipo se considera amortizado y el inventario se reiniciará para un nuevo proyecto.