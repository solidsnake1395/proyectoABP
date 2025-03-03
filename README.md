# proyectoABP
Sistema de Gestión de Guardias de Profesores 📚
Descripción 📝
Este proyecto tiene como objetivo el desarrollo de una aplicación web que registre y gestione las guardias de los profesores en caso de ausencias. A través de esta aplicación, los administradores o usuarios autorizados pueden anotar las guardias, asignar profesores sustitutos, indicar los grupos y aulas afectados, y registrar si hay alumnos problemáticos.

Futuro: El sistema se expandirá con el reemplazo de la base de datos actual por una API RESTful con Laravel y la integración con el sistema Delphos para obtener datos más actualizados de los profesores.

Funcionalidades 🔧
Gestión de Guardias: Registrar ausencias y asignar profesores sustitutos.
Formulario Interactivo: Visualización de las guardias en un formulario que puede ser llenado y enviado en tiempo real.
Petición AJAX: Enviar los datos al servidor con jQuery para guardarlos en un archivo JSON local.
Validación de Campos: Asegura que todos los campos obligatorios se completen antes de enviarlo.
Interactividad con Vue.js: Creación de una interfaz dinámica y actualizada de manera automática.
Tecnologías Usadas 💻
Vue.js: Framework JavaScript para crear interfaces reactivas y dinámicas.
jQuery: Biblioteca para manejar AJAX y manipulación del DOM.
JSON Server: Simulación de una base de datos local para el almacenamiento de datos.
Laravel (Futuro): API RESTful para mejorar la gestión y escalabilidad del sistema.
Delphos (Futuro): Integración con el sistema educativo para obtener datos reales de los profesores.
Estructura de Datos 📂
Profesores (profesores.json)
Contiene los datos de los profesores, como nombre, id, etc. Estos datos se cargarán dinámicamente en el formulario para facilitar la selección de profesores al registrar una guardia.

Ejemplo:
json
Copiar
Editar
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
Guardias (guardias.json)
Almacena las guardias registradas, con información sobre la hora, profesor asignado, grupo y aula afectados, entre otros detalles importantes.

Ejemplo:
json
Copiar
Editar
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
Instalación 🚀
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/tu-usuario/proyecto-guardias.git
Dirígete a la carpeta del proyecto:

bash
Copiar
Editar
cd proyecto-guardias
Instala las dependencias de JSON Server para simular la base de datos:

bash
Copiar
Editar
npm install json-server
Inicia el servidor JSON Server:

bash
Copiar
Editar
npx json-server --watch profesores.json --watch guardias.json --port 3000
Abre el proyecto en tu navegador (el servidor se ejecutará en http://localhost:3000).

Pantallazo 📸
Aquí puedes añadir una captura de pantalla del proyecto en ejecución, para que los demás puedan ver cómo se ve la interfaz. Ejemplo:


Futuros Desarrollos 🚀
Reemplazo del servidor JSON Server: En el futuro, la base de datos local se reemplazará por una API RESTful desarrollada con Laravel, lo que permitirá mayor escalabilidad y seguridad.
Integración con Delphos: Los datos de los profesores se extraerán directamente del sistema Delphos para garantizar que siempre estén actualizados.
Contribuciones 🤝
Si quieres contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Haz los cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Empuja los cambios a tu repositorio (git push origin feature/nueva-funcionalidad).
Abre un pull request en GitHub.
Licencia 📜
Este proyecto está licenciado bajo la MIT License - ver el archivo LICENSE para más detalles.
