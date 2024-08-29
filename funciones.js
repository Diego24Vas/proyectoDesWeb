// Función para manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault(); // Previene el envío real del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    alert(`Datos ingresados:\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`);
}

// Ejemplo de evento interactivo con el mouse
document.querySelector('header').addEventListener('mouseover', () => {
    alert('Bienvenido a SUSHITO SHAN-GAI, el mejor sushi en Temuco!');
});


//ESTE JS LO CREE CON CHAT GPT, NO TENGO NI FOKIN IDEA DE COMO FUNCIONA O SI ESTA BIEN.. TENEMOS QUE INVESTIGARLO