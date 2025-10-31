// static/js/script.js

// products variable is injected in the template by json_script and loaded in index.html
// Ensure `const products = ...` is defined before this file is loaded.

let cart = {};

// Initialize the app
function init() {
    renderProducts();
    updateCart();
}

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-emoji">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-btn" data-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `).join('');

    // Attach click listeners to buttons (safer than inline onclick)
    productsContainer.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.currentTarget.dataset.id);
            addToCart(id, e.currentTarget);
        });
    });
}

// Add item to cart
function addToCart(productId, btnElement) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    if (cart[productId]) {
        cart[productId].quantity += 1;
    } else {
        cart[productId] = { ...product, quantity: 1 };
    }
    updateCart();

    // Visual feedback
    const originalText = btnElement.textContent;
    btnElement.textContent = 'Added!';
    btnElement.style.background = '#48bb78';
    setTimeout(() => {
        btnElement.textContent = originalText;
        btnElement.style.background = '';
    }, 1000);
}

// Remove item from cart
function removeFromCart(productId) {
    delete cart[productId];
    updateCart();
}

// Update quantity
function updateQuantity(productId, change) {
    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const totalAmount = document.getElementById('total-amount');

    const items = Object.values(cart);

    if (items.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        if (totalContainer) totalContainer.style.display = 'none';
        return;
    }

    cartContainer.innerHTML = items.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <div class="item-emoji">${item.emoji}</div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)} each</div>
                </div>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" data-id="${item.id}" data-change="-1">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
    `).join('');

    // Attach listeners for quantity and remove buttons
    cartContainer.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.currentTarget.dataset.id);
            const change = Number(e.currentTarget.dataset.change);
            updateQuantity(id, change);
        });
    });
    cartContainer.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.currentTarget.dataset.id);
            removeFromCart(id);
        });
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
    if (totalContainer) totalContainer.style.display = 'block';
}

// Checkout
function checkout() {
    const items = Object.values(cart);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    alert(`Thank you for your purchase!\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}\n\nYour order will be processed shortly.`);

    cart = {};
    updateCart();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
