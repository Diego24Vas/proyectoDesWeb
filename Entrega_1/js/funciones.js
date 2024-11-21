function handleSubmit(event) {
    event.preventDefault();                                    // Previene el envío real del formulario
    const nombre = document.getElementById('nombre').value;    // Obtiene el valor del campo con ID 'nombre'
    const correo = document.getElementById('correo').value;      // Obtiene el valor del campo con ID 'correo'
    const mensaje = document.getElementById('mensaje').value;  // Obtiene el valor del campo con ID 'mensaje'

    // Muestra una alerta con los datos ingresados
    alert(`Datos ingresados:\nNombre: ${nombre}\ncorreo: ${correo}\nMensaje: ${mensaje}`);
}

// Ejemplo de evento interactivo con el mouse
document.querySelector('header').addEventListener('mouseover', () => {
    
    // Muestra una alerta cuando el mouse pasa sobre el header
    alert('Bienvenido a SUSHITO SHAN-GAI, el mejor sushi en Temuco!');
});