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
                    <td>${contacto.correo}</td>
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
                    <td>
                        <button class="editar-usuario" data-id="${usuario.id}">Editar</button>
                        <button class="eliminar-usuario" data-id="${usuario.id}">Eliminar</button>
                    </td>
                `;
            });

            // Agregar evento de clic a los botones de eliminar
            document.querySelectorAll('.eliminar-usuario').forEach(button => {
                button.addEventListener('click', function() {
                    const usuarioId = this.getAttribute('data-id');
                    eliminarUsuario(usuarioId, this.closest('tr'));
                });
            });

            // Agregar evento de clic a los botones de editar
            document.querySelectorAll('.editar-usuario').forEach(button => {
                button.addEventListener('click', function() {
                    const usuarioId = this.getAttribute('data-id');
                    editarUsuario(usuarioId);
                });
            });
        })
        .catch(error => console.error('Error al cargar los usuarios:', error));
}

function eliminarUsuario(usuarioId, fila) {
    fetch('../php/eliminar_usuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: usuarioId })
    })
    .then(response => {
        if (response.ok) {
            fila.remove();
        } else {
            console.error('Error al eliminar el usuario');
        }
    })
    .catch(error => console.error('Error al eliminar el usuario:', error));
}

function editarUsuario(usuarioId) {
    // Redirigir a la página de edición con el ID del usuario
    window.location.href = `editar_usuario.html?id=${usuarioId}`;
}


//---------------------------------------------------------------------------------

//Funcion para agregar un nuevo usuario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('agregarUsuarioForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {
            id: formData.get('id'),
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            cargo: formData.get('cargo'),
            password: formData.get('password')
        };

        fetch('agregar_usuario.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            const alertContainer = document.getElementById('alertContainer');
            if (result.success) {
                const successAlert = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Usuario agregado exitosamente.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                alertContainer.innerHTML = successAlert;
                setTimeout(() => {
                    window.location.href = '../admin/index.html';
                }, 3000);
            } else {
                const errorAlert = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Error al agregar el usuario: ${result.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                alertContainer.innerHTML = errorAlert;
            }
        })
        .catch(error => {
            const alertContainer = document.getElementById('alertContainer');
            const errorAlert = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Error al agregar el usuario: ${error.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            alertContainer.innerHTML = errorAlert;
            console.error('Error al agregar el usuario:', error);
        });
    });
});


//---------------------------------------------------------------------------------
// Se ejecuta cuando todo el contenido del DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');

    // Cargar datos del usuario
    fetch(`../php/obtener_usuario.php?id=${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('apellido').value = data.apellido;
            document.getElementById('cargo').value = data.cargo;
        })
        .catch(error => console.error('Error al cargar los datos del usuario:', error));

    // Enviar datos actualizados
    document.getElementById('formEditarUsuario').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const cargo = document.getElementById('cargo').value;

        fetch('../php/actualizar_usuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: usuarioId, nombre: nombre, apellido: apellido, cargo: cargo })
        })
        .then(response => response.json())
        .then(data => {
            const alertContainer = document.getElementById('alertContainer');
            alertContainer.innerHTML = ''; // Limpiar alertas anteriores

            if (data.message === 'Usuario actualizado correctamente') {
                const successAlert = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Usuario actualizado correctamente.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                alertContainer.innerHTML = successAlert;
            } else {
                const errorAlert = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Error al actualizar el usuario.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `;
                alertContainer.innerHTML = errorAlert;
            }
        })
        .catch(error => {
            const alertContainer = document.getElementById('alertContainer');
            const errorAlert = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Error al actualizar el usuario: ${error.message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            alertContainer.innerHTML = errorAlert;
            console.error('Error al actualizar el usuario:', error);
        });
    });
});

