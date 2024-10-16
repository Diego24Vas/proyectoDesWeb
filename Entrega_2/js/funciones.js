
// FUNCION QUE SUMA LA CANTIDAD DE PRODUCTOS Y CALCULA EL TOTAL
let total = 0;
function modificarCantidad(precio, idCantidad, cantidad) {
    let elementoCantidad = document.getElementById(idCantidad);
    let cantidadActual = parseInt(elementoCantidad.textContent);

    // Actualizamos la cantidad, y impide menos que cero
    let nuevaCantidad = cantidadActual + cantidad;
    if (nuevaCantidad < 0) return;

    // Actualiza la cantidad
    elementoCantidad.textContent = nuevaCantidad;

    // Calculamos el total
    total += precio * cantidad;
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;
}

function handleSubmit(event) {
    event.preventDefault();
    alert("Pedido realizado con éxito");
}



// FUNCION PARA MOSTRAR DATOS INGRESADOS EN FORMULARIO
function handleSubmit(event) {
    event.preventDefault();                                    // Previene el envío real del formulario
    const nombre = document.getElementById('nombre').value;    // Obtiene el valor del campo con ID 'nombre'
    const email = document.getElementById('email').value;      // Obtiene el valor del campo con ID 'email'
    const mensaje = document.getElementById('mensaje').value;  // Obtiene el valor del campo con ID 'mensaje'

    // Muestra una alerta con los datos ingresados
    alert(`Datos ingresados:\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`);
    console.log(`Datos ingresados:\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`);
}

// Ejemplo de evento interactivo con el mouse
document.querySelector('header').addEventListener('mouseover', () => {
    
    // Muestra una alerta cuando el mouse pasa sobre el header
    alert('Bienvenido a SUSHITO SHAN-GAI, el mejor sushi en Temuco!');
});



