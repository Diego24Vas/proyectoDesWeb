// FUNCION PARA VER LAS IMAGENES DE LOS SUSHIS
const galeriaSushi = {
    imagenes: [
        'img/Emperador.jpeg',
        'img/Fire.jpeg',
        'img/Guerrero.jpeg',
        'img/Maestro.jpeg',
        'img/Shangai.jpeg'
    ],
    indiceActual: 0,
    mostrarImagen: function() {
        const imagenSushi = document.getElementById('imagenSushi');
        imagenSushi.src = this.imagenes[this.indiceActual];
        console.log(`Mostrando imagen: ${this.imagenes[this.indiceActual]}`);
    },
    siguiente: function() {
        this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
        this.mostrarImagen();
    },
    anterior: function() {
        this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
        this.mostrarImagen();
    },
    iniciar: function() {
        const siguienteBtn = document.getElementById('siguienteBtn');
        const anteriorBtn = document.getElementById('anteriorBtn');

        siguienteBtn.addEventListener('click', () => this.siguiente());
        anteriorBtn.addEventListener('click', () => this.anterior());

        this.mostrarImagen(); // Mostrar la primera imagen al cargar
    }
};

// --------------------------------------------------------------------------------- 

// FUNCION PARA VER LAS RESEÑAS DE LOS CLIENTES
const gestorReseñas = {
    reseñas: [
        '"¡El mejor sushi que he probado! - Juan"',
        '"Un servicio excepcional y sabores increíbles. - María"',
        '"Definitivamente volveré. - Pedro"',
        '"Ambiente acogedor y delicioso sushi. - Laura"',
        '"¡Recomiendo el rollo especial! - Carlos"'
    ],
    indiceActual_1: 0,
    mostrarReseña: function() {
        const listaReseñas = document.getElementById('listaReseñas');
        listaReseñas.innerHTML = this.reseñas[this.indiceActual_1];
        console.log(`Mostrando reseña: ${this.reseñas[this.indiceActual_1]}`);
    },
    cambiarReseña: function() {
        this.indiceActual_1 = (this.indiceActual_1 + 1) % this.reseñas.length;
        this.mostrarReseña();
    },
    iniciar: function() {
        const cambiarReseñaBtn = document.getElementById('cambiarReseñaBtn');
        cambiarReseñaBtn.addEventListener('click', () => this.cambiarReseña());
        
        this.mostrarReseña(); // Mostrar la primera reseña al cargar
    }
};

// Iniciar ambas funciones al cargar la página
window.onload = function() {
    galeriaSushi.iniciar();
    gestorReseñas.iniciar();
};

// ---------------------------------------------------------------------------------



// ---------------------------------------------------------------------------------

// FUNCION PARA MOSTRAR DATOS INGRESADOS EN FORMULARIO
function handleSubmit(event) {
    event.preventDefault(); // Previene el envío real del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    console.log(`Datos ingresados:\nNombre: ${nombre}\ncorreo: ${correo}\nMensaje: ${mensaje}`);
}



// ---------------------------------------------------------------------------------

/// FUNCION PARA CARGAR CONTACTOS DESDE LA BASE DE DATOS CON FETCH
document.getElementById('cargarContactos').addEventListener('click', function() {
    fetch('php/obtener_contactos.php')
    .then(response => response.json())
    .then(data => {
        const tablaContactos = document.getElementById('tablaContactos').getElementsByTagName('tbody')[0];
        tablaContactos.innerHTML = ""; // Limpiar la tabla antes de agregar los nuevos contactos

        if (data.length === 0) {
            const row = tablaContactos.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 3;
            cell.textContent = "No hay contactos registrados.";
        } else {
            data.forEach(contacto => {
                const row = tablaContactos.insertRow();
                const cellNombre = row.insertCell(0);
                const cellcorreo = row.insertCell(1);
                const cellMensaje = row.insertCell(2);

                cellNombre.textContent = contacto.nombre;
                cellcorreo.textContent = contacto.correo;
                cellMensaje.textContent = contacto.mensaje;
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener los contactos:', error);
    });
});
