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

// FUNCION QUE SUMA LA CANTIDAD DE PRODUCTOS Y CALCULA EL TOTAL
let total = 0;
function modificarCantidad(precio, idCantidad, cantidad) {
    let elementoCantidad = document.getElementById(idCantidad);
    let cantidadActual = parseInt(elementoCantidad.textContent);

    // Actualizamos la cantidad, y evita menos que cero
    let nuevaCantidad = cantidadActual + cantidad;
    if (nuevaCantidad < 0) return;

    // Actualiza la cantidad
    elementoCantidad.textContent = nuevaCantidad;

    // Calculamos el total
    total += precio * cantidad;
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;

    console.log(`Total: ${total}`);
}

function handleSubmit(event) {
    event.preventDefault();                                             // Evita el envío inmediato del formulario
    const totalElement = document.getElementById('total');
    const totalValue = parseFloat(totalElement.textContent.replace('$', '').replace(',', '')); // Quita los símbolos de moneda
    document.getElementById('totalInput').value = totalValue;                                   // Asigna el total al campo oculto

    event.target.submit();
}

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
                const cellEmail = row.insertCell(1);
                const cellMensaje = row.insertCell(2);

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
