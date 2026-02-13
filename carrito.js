// array carrito
let carrito = [];

// carga carrito localstorage
document.addEventListener('DOMContentLoaded', function() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarContadorCarrito();
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    // ver si el producto existe 
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador
    actualizarContadorCarrito();
    
    // Mostrar un mensaje cuando se agrgue aalgo
    mostrarMensaje('Producto agregado al carrito');
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
    const contadores = document.querySelectorAll('.contador-carrito');
    
    contadores.forEach(contador => {
        contador.textContent = totalProductos;
        if (totalProductos > 0) {
            contador.style.display = 'inline-block';
        } else {
            contador.style.display = 'none';
        }
    });
}

// Función para mostrar mensaje de confirmación
function mostrarMensaje(texto) {
    // Crear elemento de mensaje
    const mensaje = document.createElement('div');
    mensaje.className = 'alert alert-success mensaje-flotante';
    mensaje.textContent = texto;
    mensaje.style.position = 'fixed';
    mensaje.style.top = '20px';
    mensaje.style.right = '20px';
    mensaje.style.zIndex = '9999';
    mensaje.style.minWidth = '200px';
    
    document.body.appendChild(mensaje);
    
    // Eliminar después de 1 segundos el mensaje
    setTimeout(() => {
        mensaje.remove();
    }, 1000);
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
    actualizarContadorCarrito();
}

// Función para aumentar la cantidad
function aumentarCantidad(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad++;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
        actualizarContadorCarrito();
    }
}

// Función para disminuir la cantidad
function disminuirCantidad(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
        actualizarContadorCarrito();
    }
}

// Función para cargar y mostrar el carrito (para la página de carrito)
function cargarCarrito() {
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    
    if (!contenedorCarrito) return;
    
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="alert alert-info text-center">
            <h4>Tu carrito está vacío</h4>
            <p>Agrega productos para continuar</p>
            <a href="index.html" class="btn btn-primary">Ir a la tienda</a>
            </div>
        `;
        totalCarrito.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        html += `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}" style="height: 200px; object-fit: cover;">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">Precio: $${item.precio.toLocaleString()}</p>
                            <div class="d-flex align-items-center mb-3">
                            <button class="btn btn-sm btn-outline-secondary" onclick="disminuirCantidad('${item.nombre}')">-</button>
                            <span class="mx-3 fw-bold">${item.cantidad}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="aumentarCantidad('${item.nombre}')">+</button>
                            </div>
                            <p class="fw-bold">Subtotal: $${subtotal.toLocaleString()}</p>
                            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    contenedorCarrito.innerHTML = html;
    totalCarrito.textContent = total.toLocaleString();
}

// Función para finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // mensaje final compra
            swal("Gracias😊✅","Por Realizar Tu Compra","success")

}
