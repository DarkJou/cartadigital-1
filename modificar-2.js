// Obtener productos del servidor
function fetchProducts() {
    fetch('http://cartavirtual.azurewebsites.net/productos-2')
        .then((response) => {
            if (!response.ok) throw new Error('Error al obtener productos');
            return response.json();
        })
        .then((data) => {
            products = data; // Almacena los productos
            renderProducts(); // Renderiza en la lista
        })
        .catch((error) => console.error('Error al obtener productos:', error));
}

// Renderizar productos en la lista
function renderProducts() {
    productList.innerHTML = ''; // Limpia la lista actual
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.img}" alt="${product.name}" width="50">
            <input type="text" value="${product.name}" data-index="${index}" data-field="name">
            <input type="text" value="${product.price}" data-index="${index}" data-field="price">
            <button data-index="${index}" class="modify-button">Modificar</button>
            <button data-index="${index}" class="delete-button">Eliminar</button>
        `;
        productList.appendChild(li);
    });
}

// Agregar un nuevo producto
addButton.addEventListener('click', () => {
    const imgInput = document.getElementById('add-img');
    const name = document.getElementById('add-name').value.trim();
    const price = document.getElementById('add-price').value.trim();

    if (imgInput.files[0] && name && price) {
        convertImageToBase64(imgInput.files[0], (base64Img) => {
            fetch('http://cartavirtual.azurewebsites.net/productos-2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ img: base64Img, name, price }),
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Error al agregar producto');
                    return response.text();
                })
                .then((message) => {
                    alert(message);
                    fetchProducts(); // Actualiza la lista
                    addForm.reset(); // Limpia el formulario
                })
                .catch((error) => console.error('Error al agregar producto:', error));
        });
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Modificar un producto
productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('modify-button')) {
        const index = event.target.dataset.index;
        const updatedProduct = products[index];

        // Enviar actualización al servidor
        fetch(`http://cartavirtual.azurewebsites.net/productos-2/${updatedProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Error al modificar producto');
                return response.text();
            })
            .then((message) => {
                alert(message);
                fetchProducts(); // Refresca la lista
            })
            .catch((error) => console.error('Error al modificar producto:', error));
    }
});

// Eliminar un producto
productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.dataset.index;
        const productId = products[index].id;

        fetch(`http://cartavirtual.azurewebsites.net/productos-2/${productId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) throw new Error('Error al eliminar producto');
                return response.text();
            })
            .then((message) => {
                alert(message);
                fetchProducts(); // Actualiza la lista
            })
            .catch((error) => console.error('Error al eliminar producto:', error));
    }
});

// Convertir imagen local a Base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
}

// Inicializar la aplicación
fetchProducts();
