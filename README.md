# 📌 Sistema de Gestión de Guardias de Profesores 📚

## 🚀 Introducción
Este proyecto tiene como objetivo el desarrollo de una **aplicación web** que registre y gestione las **guardias de los profesores** en caso de ausencias. A través de esta aplicación, los administradores o usuarios autorizados pueden anotar las guardias, asignar profesores sustitutos, indicar los grupos y aulas afectados, y registrar si hay alumnos problemáticos.

**Futuro**: Se planea la integración de una **API RESTful con Laravel** y la conexión con el sistema **Delphos** para obtener datos actualizados de los profesores.

## 🛠️ Decisiones Tecnológicas
📌 **Backend:**
Inicialmente, se había planeado desarrollar el backend en **Laravel** 🏗️, ya que ofrece una estructura robusta y herramientas avanzadas para la gestión de bases de datos y autenticación. Sin embargo, debido a limitaciones de tiempo, se optó por utilizar un servidor **JSON** 📄 para simular los datos y realizar pruebas con información ficticia.

🎨 **Frontend:**
Se eligió **Vue.js** ⚡ debido a su facilidad de integración y su capacidad de manejar componentes reutilizables, lo que permitió estructurar la interfaz de manera modular y escalable. Vue también facilita el desarrollo con su enfoque reactivo, mejorando la experiencia del usuario sin necesidad de recargar la página constantemente.

📡 **Interacción con el Servidor:**
Para la comunicación con el servidor se empleó **jQuery** y **AJAX** para enviar y recibir datos de manera eficiente sin recargar la página. Esto permitió almacenar la información en archivos **JSON locales**, asegurando que las guardias registradas estuvieran disponibles en tiempo real.

💅 **Estilos:**
Para los estilos se utilizó **Tailwind CSS** 🎨 debido a su flexibilidad y eficiencia en el diseño, permitiendo una personalización rápida sin necesidad de escribir grandes archivos de CSS. Esto aseguró que la interfaz fuera moderna, responsiva y visualmente atractiva sin comprometer el rendimiento.

## 📌 Estructura de la Aplicación
Se diseñó un sistema de tarjetas 📇 para representar las guardias diarias. Cada tarjeta muestra información clave, como:
- 👨‍🏫 **Profesor asignado**
- 🏫 **Aula**
- ✍️ **Guardia firmada por otro profesor (sí/no)**

La tarjeta del día actual se resalta para facilitar la visualización rápida de las guardias activas. Además, la modularidad de **Vue** permitió estructurar el código de manera flexible, facilitando futuras mejoras o cambios.

## 📂 Estructura de Datos

Se decidió almacenar los datos en archivos separados para facilitar la gestión y mejorar la escalabilidad del sistema.

### **Profesores** (`profesores.json`)
Contiene los datos de los profesores, incluyendo su ID, nombre y asignaturas que imparten.

#### Ejemplo:
```json
{
  "profesores": [
    {
      "id": "1",
      "nombre": "Ana Martínez",
      "asignaturas": ["Matemáticas", "Física"],
      "grupo": "1º A"
    },
    {
      "id": "2",
      "nombre": "Juan Pérez",
      "asignaturas": ["Lengua", "Literatura"],
      "grupo": "2º B"
    }
  ]
}
```

### **Guardias** (`guardias.json`)
Almacena las guardias registradas, indicando la hora, profesor asignado, grupo, aula y otros detalles.

#### Ejemplo:
```json
{
  "guardias": [
    {
      "id": "1",
      "hora": "08:30 - 09:25",
      "dia": "Lunes",
      "profesor_id": "1",
      "grupo": "1º A",
      "aula": "A101",
      "solucion": "Sustitución",
      "alumnos_problematicos": true,
      "registro_firmado": true
    }
  ]
}
```

### **Aulas** (`aulas.json`)
Contiene la lista de aulas disponibles en el centro educativo.

#### Ejemplo:
```json
{
  "aulas": [
    { "id": "A101", "nombre": "Aula 101", "capacidad": 30 },
    { "id": "B202", "nombre": "Aula 202", "capacidad": 25 }
  ]
}
```

### **Grupos** (`grupos.json`)
Lista de grupos de alumnos junto con su identificación y nivel educativo.

#### Ejemplo:
```json
{
  "grupos": [
    { "id": "1A", "nombre": "1º A", "nivel": "ESO" },
    { "id": "2B", "nombre": "2º B", "nivel": "Bachillerato" }
  ]
}
```

## ⚙️ Instalación y Uso
1. 🔽 Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/repositorio.git
   ```
2. 📦 Instalar dependencias:
   ```bash
   npm install
   ```
3. ▶️ Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. 🗄️ Iniciar el servidor JSON:
   ```bash
   npx json-server --watch profesores.json guardias.json aulas.json grupos.json --port 3000
   ```

## ✅ Conclusión
Decidimos centrarnos en el diseño para crear una interfaz que fuera llamativa y a la vez fácil para el usuario, y conseguir con Vue y Tailwind que fuera fácilmente escalable a la hora de añadir información, estilos o funcionalidad en cualquier momento, así como integrar Laravel u otro backend que funcione con JSON en un futuro.

## 📜 Licencia
Este proyecto está bajo la licencia **MIT** 📄.

