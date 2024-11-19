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

// FUNCION PARA MOSTRAR DATOS INGRESADOS EN FORMULARIO
function handleSubmit(event) {
    event.preventDefault(); // Previene el envío real del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    console.log(`Datos ingresados:\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`);
}



// ---------------------------------------------------------------------------------

/// FUNCION PARA CARGAR CONTACTOS DESDE LA BASE DE DATOS CON FETCH
document.getElementById('cargarContactos').addEventListener('click', function() {
    fetch('../php/obtener_contactos.php')
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
                const cellID = row.insertCell(0);
                const cellNombre = row.insertCell(0);
                const cellEmail = row.insertCell(1);
                const cellMensaje = row.insertCell(2);

                cellID.textContent = contacto.id;
                cellNombre.textContent = contacto.nombre;
                cellEmail.textContent = contacto.email;
                cellMensaje.textContent = contacto.mensaje;
            });
        }
    })
    .catch(error => {
        console.error('Error al obtener los contactos:', error);
    });
});


// ---------------------------------------------------------------------------------

// FUNCION PARA ELIMINAR CONTACTOS DESDE LA BASE DE DATOS CON FETCH
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cargarContactos').addEventListener('click', cargarContactos);
});

function cargarContactos() {
    fetch('../php/obtener_contactos.php') // Reemplaza con la URL de tu archivo PHP
        .then(response => response.json())
        .then(contactos => {
            const tbody = document.querySelector('#tablaContactos tbody');
            tbody.innerHTML = ''; // Limpiar la tabla antes de cargar los contactos

            contactos.forEach(contacto => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.email}</td>
                    <td>${contacto.mensaje}</td>
                    <td>
                        <button class="btn btn-danger btn-sm eliminar-contacto" data-id="${contacto.id}">Eliminar</button>
                    </td>
                `;

                tbody.appendChild(tr);
            });

            // Agregar evento de clic a los botones de eliminar
            document.querySelectorAll('.eliminar-contacto').forEach(button => {
                button.addEventListener('click', function() {
                    const contactoId = this.getAttribute('data-id');
                    eliminarContacto(contactoId, this.closest('tr'));
                });
            });
        })
        .catch(error => console.error('Error al cargar los contactos:', error));
}

function eliminarContacto(contactoId, fila) {
    fetch('../php/eliminar_contacto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: contactoId })
    })
    .then(response => {
        if (response.ok) {
            fila.remove();
        } else {
            console.error('Error al eliminar el contacto');
        }
    })
    .catch(error => console.error('Error al eliminar el contacto:', error));
}

function ocultarContactos() {
    const tabla = document.getElementById('tablaContactos');
    if (tabla.style.display === 'none') {
        tabla.style.display = 'table';
        document.getElementById('ocultarContactos').textContent = 'Ocultar Contactos';
    } else {
        tabla.style.display = 'none';
        document.getElementById('ocultarContactos').textContent = 'Mostrar Contactos';
    }
}


// ---------------------------------------------------------------------------------


