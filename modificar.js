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
            <input type="file" data-index="${index}" class="modify-img-input">
            <button data-index="${index}" class="modify-button">Modificar</button>
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

    if (!imgInput.files[0]) {
        alert("Por favor, selecciona una imagen.");
        return;
    }

    const file = imgInput.files[0];
    const validImageTypes = [
        "image/jpeg", 
        "image/png", 
        "image/gif", 
        "image/webp", 
        "image/jpg"
    ];

    // Diagnóstico: Verifica el tipo MIME
    console.log("Tipo MIME del archivo:", file.type);

    // Validar si el archivo es una imagen
    if (!validImageTypes.includes(file.type)) {
        alert("Solo se permiten imágenes en formato JPEG, PNG, GIF, WEBP o JPG.");
        return;
    }

    const fileSizeInMB = file.size / 1024 / 1024; // Convertir a MB

    // Diagnóstico: Verifica el tamaño del archivo
    console.log("Tamaño del archivo:", fileSizeInMB, "MB");

    // Validar tamaño de archivo (5 MB como límite)
    if (fileSizeInMB > 5) {
        alert("La imagen es demasiado grande. Elige un archivo de menos de 5 MB.");
        return;
    }

    // Validar campos
    if (name && price) {
        convertImageToBase64(file, (base64Img) => {
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
productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("modify-button")) {
        const index = event.target.dataset.index;
        const nameInput = document.querySelector(`input[data-index="${index}"][data-field="name"]`);
        const priceInput = document.querySelector(`input[data-index="${index}"][data-field="price"]`);
        const imgInput = document.querySelector(`input[data-index="${index}"].modify-img-input`);

        // Modificar nombre y precio
        products[index].name = nameInput.value.trim();
        products[index].price = priceInput.value.trim();

        // Modificar imagen si se subió una nueva
        if (imgInput.files[0]) {
            convertImageToBase64(imgInput.files[0], (base64Img) => {
                products[index].img = base64Img;
                saveProducts(); // Guardar cambios
                renderProducts(); // Actualizar lista
                alert("Producto modificado correctamente.");
            });
        } else {
            saveProducts(); // Guardar cambios
            renderProducts(); // Actualizar lista
            alert("Producto modificado correctamente.");
        }
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
