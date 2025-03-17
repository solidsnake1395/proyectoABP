# proyectoABP


# Sistema de Gestión de Guardias de Profesores 📚

## Descripción 📝

Este proyecto tiene como objetivo el desarrollo de una **aplicación web** que registre y gestione las **guardias de los profesores** en caso de ausencias. A través de esta aplicación, los administradores o usuarios autorizados pueden anotar las guardias, asignar profesores sustitutos, indicar los grupos y aulas afectados, y registrar si hay alumnos problemáticos.

**Futuro**: El sistema se expandirá con el reemplazo de la base de datos actual por una **API RESTful con Laravel** y la **integración con el sistema Delphos** para obtener datos más actualizados de los profesores.

---

## Funcionalidades 🔧

- **Gestión de Guardias**: Registrar ausencias y asignar profesores sustitutos.
- **Formulario Interactivo**: Visualización de las guardias en un formulario que puede ser llenado y enviado en tiempo real.
- **Petición AJAX**: Enviar los datos al servidor con jQuery para guardarlos en un archivo JSON local.
- **Validación de Campos**: Asegura que todos los campos obligatorios se completen antes de enviarlo.
- **Interactividad con Vue.js**: Creación de una interfaz dinámica y actualizada de manera automática.

---

## Tecnologías Usadas 💻

- **Vue.js**: Framework JavaScript para crear interfaces reactivas y dinámicas.
- **jQuery**: Biblioteca para manejar AJAX y manipulación del DOM.
- **JSON Server**: Simulación de una base de datos local para el almacenamiento de datos.
- **Laravel (Futuro)**: API RESTful para mejorar la gestión y escalabilidad del sistema.
- **Delphos (Futuro)**: Integración con el sistema educativo para obtener datos reales de los profesores.

---

## Estructura de Datos 📂

### **Base de datos (db.json)**

Profesores:

Contiene los datos de los profesores, como nombre, id, etc. Estos datos se cargarán dinámicamente en el formulario para facilitar la selección de profesores al registrar una guardia.

#### Ejemplo:
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "departamento": "Matemáticas"
  },
  {
    "id": 2,
    "nombre": "Ana Gómez",
    "departamento": "Lengua"
  }
]
```
Guardias:
Almacena las guardias registradas, con información sobre la hora, profesor asignado, grupo y aula afectados, entre otros detalles importantes.

Ejemplo:
```json
[
  {
    "hora": "08:00",
    "profesor": "Juan Pérez",
    "grupo": "2A",
    "aula": "101",
    "solucion": "Sustitución",
    "alumnos_problematicos": true,
    "firma": false
  }
]
