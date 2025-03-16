function getWeekRange(date) {
    let day = date.getDay();
    if (day === 0) day = 7; // Tratar domingo como día 7

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - day + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek };
}

function parseSpanishDate(dateString) {
    try {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
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
            guardiasFiltradas: [],
            diaSeleccionado: null,
            mostrarDetalles: null,
            horaSeleccionada: null,
            cargando: false,
            semanaSeleccionada: new Date()
        };
    },
    mounted() {
        this.cargarDatos();
        this.setDiaSeleccionado();
    },
    computed: {
        rangoSemana() {
            const { startOfWeek, endOfWeek } = getWeekRange(this.semanaSeleccionada);
            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
        }
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
            if (diaActual === 0 || diaActual === 6) {
                // Si es domingo (0) o sábado (6), saltar a la semana siguiente
                this.cambiarSemana(1);
                this.diaSeleccionado = "Lunes";
            } else {
                this.diaSeleccionado = diasSemana[diaActual - 1];
            }
        },
        esDiaActual(dia) {
            const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
            const diaActual = new Date().getDay();
            if (diaActual === 0 || diaActual === 6) return false;
            return diasSemana[diaActual - 1] === dia;
        },
        obtenerGuardias(dia) {
            return this.guardiasFiltradas.filter((g) => g.dia.trim().toLowerCase() === dia.trim().toLowerCase());
        },
        obtenerPendientes(dia) {
            return this.obtenerGuardias(dia).filter(g => !g.registro_firmado).length;
        },
        obtenerCompletadas(dia) {
            return this.obtenerGuardias(dia).filter(g => g.registro_firmado).length;
        },
        obtenerTotalPendientes() {
            return this.guardiasFiltradas.filter(g => !g.registro_firmado).length;
        },
        obtenerTotalCompletadas() {
            return this.guardiasFiltradas.filter(g => g.registro_firmado).length;
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
                const fechaGuardia = parseSpanishDate(guardia.fecha_guardia_formateada);
                return fechaGuardia >= startOfWeek && fechaGuardia <= endOfWeek;
            });
        },
        cambiarSemana(direccion) {
            const nuevaFecha = new Date(this.semanaSeleccionada);
            nuevaFecha.setDate(nuevaFecha.getDate() + direccion * 7);
            this.semanaSeleccionada = nuevaFecha;
            // Vuelve a filtrar en vez de recargar todo, si ya has cargado las guardias:
            this.filtrarGuardiasPorSemana();
        }
    },
});

app.mount("#app");