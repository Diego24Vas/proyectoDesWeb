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

document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento de clic para cargar contactos
    document.getElementById('cargarContactos').addEventListener('click', cargarContactos);

    // Agregar evento de clic para cargar usuarios
    document.getElementById('cargarUsuarios').addEventListener('click', mostrarUsuarios);
});

function cargarContactos() {
    fetch('../php/obtener_contactos.php')
        .then(response => response.json())
        .then(data => {
            const tablaContactos = document.getElementById('tablaContactos').getElementsByTagName('tbody')[0];
            tablaContactos.innerHTML = ''; // Limpiar la tabla antes de llenarla

            data.forEach(contacto => {
                const fila = tablaContactos.insertRow();
                fila.innerHTML = `
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.email}</td>
                    <td>${contacto.mensaje}</td>
                    <td><button class="eliminar-contacto" data-id="${contacto.id}">Eliminar</button></td>
                `;
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

function mostrarUsuarios() {
    fetch('../php/obtener_usuarios.php')
        .then(response => response.json())
        .then(data => {
            const tablaUsuarios = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
            tablaUsuarios.innerHTML = ''; // Limpiar la tabla antes de llenarla

            data.forEach(usuario => {
                const fila = tablaUsuarios.insertRow();
                fila.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.cargo}</td>
                `;
            });
        })
        .catch(error => console.error('Error al cargar los usuarios:', error));
}