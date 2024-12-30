// Array de productos iniciales
let products = JSON.parse(localStorage.getItem("products")) || [
    { img: "img/pitufo.jpg", name: "Pitufoto", price: "S/.8.00" },
    { img: "img/limonada.jpg", name: "Limonada", price: "S/.5.00" },
];

// Referencias de elementos del DOM
const addForm = document.getElementById("add-form");
const addButton = document.getElementById("add-button");
const productList = document.getElementById("product-list");

// Renderizar productos existentes
function renderProducts() {
    productList.innerHTML = ""; // Limpiar lista
    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${product.img}" alt="${product.name}" width="50">
            <input type="text" value="${product.name}" data-index="${index}" data-field="name">
            <input type="text" value="${product.price}" data-index="${index}" data-field="price">
            <button data-index="${index}" class="delete-button">Eliminar</button>
        `;
        productList.appendChild(li);
    });
}

// Guardar los productos en localStorage
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Convertir imagen local a base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.readAsDataURL(file);
}

// Agregar producto
addButton.addEventListener("click", () => {
    const imgInput = document.getElementById("add-img");
    const name = document.getElementById("add-name").value.trim();
    const price = document.getElementById("add-price").value.trim();

    if (imgInput.files[0] && name && price) {
        convertImageToBase64(imgInput.files[0], (base64Img) => {
            products.push({ img: base64Img, name, price });
            saveProducts(); // Guardar en localStorage
            renderProducts(); // Actualizar lista
            addForm.reset(); // Limpiar formulario
            alert("Producto agregado correctamente.");
        });
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Modificar productos
productList.addEventListener("input", (event) => {
    const index = event.target.dataset.index;
    const field = event.target.dataset.field;

    if (index !== undefined && field) {
        products[index][field] = event.target.value; // Actualizar producto
        saveProducts(); // Guardar cambios
    }
});

// Eliminar productos
productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
        const index = event.target.dataset.index;
        products.splice(index, 1); // Eliminar producto
        saveProducts(); // Guardar cambios
        renderProducts(); // Actualizar lista
    }
});

// Inicializar
renderProducts();
