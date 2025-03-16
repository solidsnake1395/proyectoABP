function getWeekRange(date) {
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);
    
    // Set startOfWeek to the previous Monday
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    
    // Set endOfWeek to the next Sunday
    endOfWeek.setDate(date.getDate() - date.getDay() + 7);
    
    // Set the time to the start of the day for startOfWeek
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Set the time to the end of the day for endOfWeek
    endOfWeek.setHours(23, 59, 59, 999);
    
    return { startOfWeek, endOfWeek };
}

function parseSpanishDate(dateString) {
    try {
        const [datePart, timePart] = dateString.split(', ');
        const [day, month, year] = datePart.split('/');
        return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}`);
    } catch (error) {
        console.error(`Error parsing date: ${dateString}`, error);
        return new Date();
    }
}

const app = Vue.createApp({
    data() {
        return {
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            horas: [
                "08:30 - 09:25",
                "09:25 - 10:20",
                "10:20 - 11:15",
                "11:15 - 11:45",
                "11:45 - 12:40",
                "12:40 - 13:35",
                "13:35 - 14:30",
            ],
            profesores: [],
            guardias: [],
            diaSeleccionado: null,
            mostrarDetalles: null,
            horaSeleccionada: null,
            cargando: false,
            semanaSeleccionada: new Date() // Nuevo campo para la semana seleccionada
        };
    },
    mounted() {
        this.cargarDatos();
        this.setDiaSeleccionado();
    },
    methods: {
        async cargarDatos() {
            this.cargando = true;
            try {
                let responseProfesores = await fetch("http://localhost:3000/profesores");
                this.profesores = await responseProfesores.json();

                let responseGuardias = await fetch("http://localhost:3000/guardias");
                let guardias = await responseGuardias.json();

                this.guardias = guardias;

                this.filtrarGuardiasPorSemana();
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                this.cargando = false;
            }
        },
        setDiaSeleccionado() {
            const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
            const diaActual = new Date().getDay();
            this.diaSeleccionado = diaActual === 0 || diaActual === 6 ? "Lunes" : diasSemana[diaActual - 1];
        },
        esDiaActual(dia) {
            const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
            const diaActual = new Date().getDay();
            if (diaActual === 0 || diaActual === 6) return false;
            return diasSemana[diaActual - 1] === dia;
        },
        obtenerGuardias(dia) {
            return this.guardias.filter((g) => g.dia.trim().toLowerCase() === dia.trim().toLowerCase());
        },
        obtenerPendientes(dia) {
            return this.obtenerGuardias(dia).filter(g => !g.registro_firmado).length;
        },
        obtenerCompletadas(dia) {
            return this.obtenerGuardias(dia).filter(g => g.registro_firmado).length;
        },
        obtenerTotalPendientes() {
            return this.guardias.filter(g => !g.registro_firmado).length;
        },
        obtenerTotalCompletadas() {
            return this.guardias.filter(g => g.registro_firmado).length;
        },
        seleccionarDia(dia) {
            this.diaSeleccionado = this.diaSeleccionado === dia ? null : dia;
        },
        redirigirFormulario(dia, hora) {
            window.location.href = `ingresarGuardias.html?dia=${dia}&hora=${hora}`;
        },
        redirigirFirmarGuardia(guardia_id) {
            window.location.href = `firmarGuardia.html?guardia_id=${guardia_id}`;
        },
        obtenerProfesorNombre(profesor_id) {
            const profesor = this.profesores.find((p) => p.id === profesor_id);
            return profesor ? profesor.nombre : "Desconocido";
        },
        filtrarGuardiasPorSemana() {
            const { startOfWeek, endOfWeek } = getWeekRange(this.semanaSeleccionada);
            this.guardiasFiltradas = this.guardias.filter((guardia) => {
                const fechaGuardia = parseSpanishDate(guardia.fecha);
                return fechaGuardia >= startOfWeek && fechaGuardia <= endOfWeek;
            });
        },
        cambiarSemana(direccion) {
            const nuevaFecha = new Date(this.semanaSeleccionada);
            nuevaFecha.setDate(nuevaFecha.getDate() + (direccion * 7));
            this.semanaSeleccionada = nuevaFecha;
            this.cargarDatos();
        }
    },
});

app.mount("#app");