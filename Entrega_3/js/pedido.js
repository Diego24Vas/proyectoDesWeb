// Función para manejar el envío del formulario
function handleSubmitPedido(event) {
    event.preventDefault(); // Previene el envío real del formulario

    // Capturar los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const total = document.getElementById('totalInput').value;

    // Asegúrate de que todos los campos estén completos
    if (!nombre || !direccion || !telefono || !total) {
        console.error("Faltan campos por completar.");
        return;
    }

    // Muestra los datos en la consola (opcional)
    console.log(`Datos del pedido:
    Nombre: ${nombre}
    Dirección: ${direccion}
    Teléfono: ${telefono}
    Total: ${total}`);

    // Envía el formulario
    document.getElementById('pedidoForm').submit(); // Envía el formulario
}


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