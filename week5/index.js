const ENDPOINT = "https://6aa950f62d442cb69d49aba1.mockapi.io/products"

let products = []
let deletedProductIds = []
let isLoading = false

// Formatter for currency
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'
});

function fetchProducts() {
    return new Promise((resolve, reject) => {
        fetch(ENDPOINT)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function addNewProduct(product) {
    return new Promise((resolve, reject) => {
        fetch(ENDPOINT, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function updateProduct(product) {
    return new Promise((resolve, reject) => {
        fetch(`${ENDPOINT}/${product.id}`, {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function deleteProduct(productId) {
    return new Promise((resolve, reject) => {
        fetch(`${ENDPOINT}/${productId}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Create product element with data-product-id attribute
function createProductElement(product, isEditing = false) {
    const div = document.createElement("div");
    div.className = "product-item";
    div.setAttribute("data-product-id", product.id);

    if (isEditing) {
        div.innerHTML = `
            <div class="edit-form">
                <input type="text" class="edit-name" value="${product.name}" required>
                <input type="text" class="edit-image" value="${product.image}" required>
                <input type="text" class="edit-description" value="${product.description}" required>
                <input type="number" class="edit-quantity" value="${product.quantity}" required>
                <input type="number" class="edit-price" value="${product.price}" step="0.01" required>
                <div class="edit-form-buttons">
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn" type="button">Cancel</button>
                </div>
            </div>
        `;
    } else {
        div.innerHTML = `
            <input type="checkbox" class="delete-checkbox" data-product-id="${product.id}">
            <button class="update-button" data-product-id="${product.id}">Edit</button>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">${formatter.format(product.price)}</p>
                <p class="quantity">Quantity: ${product.quantity}</p>
            </div>
        `;
    }

    return div;
}

// Render all products
function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const productElement = createProductElement(product);
        productList.appendChild(productElement);
        attachProductEventListeners(productElement, product);
    });
}

// Attach event listeners to a product element
function attachProductEventListeners(element, product) {
    // Delete checkbox
    const checkbox = element.querySelector(".delete-checkbox");
    checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
            deletedProductIds.push(product.id);
        } else {
            deletedProductIds = deletedProductIds.filter(id => id !== product.id);
        }
        updateDeleteButton();
    });

    // Update/Edit button
    const updateBtn = element.querySelector(".update-button");
    updateBtn.addEventListener("click", () => {
        enterEditMode(element, product);
    });
}

// Enter edit mode for a product
function enterEditMode(element, product) {
    const editElement = createProductElement(product, true);
    element.replaceWith(editElement);

    const saveBtn = editElement.querySelector(".save-btn");
    const cancelBtn = editElement.querySelector(".cancel-btn");

    saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...product,
            name: editElement.querySelector(".edit-name").value,
            image: editElement.querySelector(".edit-image").value,
            description: editElement.querySelector(".edit-description").value,
            quantity: parseInt(editElement.querySelector(".edit-quantity").value),
            price: parseFloat(editElement.querySelector(".edit-price").value)
        };

        // Validate inputs
        if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.description || 
            !updatedProduct.quantity || !updatedProduct.price) {
            alert("All fields are required");
            return;
        }

        // Disable save button
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        // Call update API
        updateProduct(updatedProduct)
            .then(() => {
                // Update local products array
                const index = products.findIndex(p => p.id === product.id);
                if (index !== -1) {
                    products[index] = updatedProduct;
                }
                
                // Replace edit form with product view (surgical update)
                const updatedElement = createProductElement(updatedProduct);
                editElement.replaceWith(updatedElement);
                attachProductEventListeners(updatedElement, updatedProduct);
            })
            .catch(error => {
                console.error("Error updating product:", error);
                alert("Failed to update product");
                saveBtn.disabled = false;
                saveBtn.textContent = "Save";
            });
    });

    cancelBtn.addEventListener("click", () => {
        // Exit edit mode without saving
        const productElement = createProductElement(product);
        editElement.replaceWith(productElement);
        attachProductEventListeners(productElement, product);
    });
}

// Update delete button text and state
function updateDeleteButton() {
    const deleteBtn = document.getElementById("delete-btn");
    const count = deletedProductIds.length;
    deleteBtn.textContent = `Delete ${count} item${count !== 1 ? 's' : ''}`;
    deleteBtn.disabled = count === 0;
}

// Handle bulk delete
async function handleBulkDelete() {
    if (deletedProductIds.length === 0) return;

    const confirmed = confirm(`Are you sure you want to delete ${deletedProductIds.length} item(s)?`);
    if (!confirmed) return;

    isLoading = true;
    disableAllButtons();

    const failedIds = [];

    // Delete each product
    for (const id of deletedProductIds) {
        try {
            await deleteProduct(id);
            // Surgical delete: remove from DOM immediately
            const element = document.querySelector(`[data-product-id="${id}"]`);
            if (element) {
                element.remove();
            }
            // Remove from local products array
            products = products.filter(p => p.id !== id);
        } catch (error) {
            console.error(`Error deleting product ${id}:`, error);
            failedIds.push(id);
        }
    }

    isLoading = false;
    enableAllButtons();

    // Clear deleted product IDs
    deletedProductIds = [];
    updateDeleteButton();

    // Show result message
    if (failedIds.length > 0) {
        alert(`Failed to delete items: ${failedIds.join(", ")}`);
    } else {
        alert("All items deleted successfully!");
    }
}

// Handle add product
async function handleAddProduct(e) {
    e.preventDefault();

    const name = document.getElementById("add-name").value;
    const image = document.getElementById("add-image").value;
    const description = document.getElementById("add-description").value;
    const quantity = parseInt(document.getElementById("add-quantity").value);
    const price = parseFloat(document.getElementById("add-price").value);

    // Validate inputs
    if (!name || !image || !description || !quantity || !price) {
        alert("All fields are required");
        return;
    }

    const newProduct = { name, image, description, quantity, price };

    isLoading = true;
    disableAllButtons();

    addNewProduct(newProduct)
        .then(addedProduct => {
            products.push(addedProduct);
            const productList = document.getElementById("product-list");
            const productElement = createProductElement(addedProduct);
            productList.appendChild(productElement);
            attachProductEventListeners(productElement, addedProduct);

            // Clear form
            document.getElementById("add-form").reset();
            alert("Product added successfully!");
        })
        .catch(error => {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        })
        .finally(() => {
            isLoading = false;
            enableAllButtons();
        })
}

// Disable all buttons during loading
function disableAllButtons() {
    document.getElementById("add-btn").disabled = true;
    document.getElementById("delete-btn").disabled = true;
    document.querySelectorAll(".update-button").forEach(btn => btn.disabled = true);
}

// Enable all buttons after loading
function enableAllButtons() {
    document.getElementById("add-btn").disabled = false;
    document.getElementById("delete-btn").disabled = deletedProductIds.length === 0;
    document.querySelectorAll(".update-button").forEach(btn => btn.disabled = false);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and render products
    fetchProducts()
        .then(data => {
            products = data;
            renderProducts();
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            alert("Failed to load products");
        });

    // Add form submission
    document.getElementById("add-form").addEventListener("submit", handleAddProduct);

    // Delete button click
    document.getElementById("delete-btn").addEventListener("click", handleBulkDelete);
});
