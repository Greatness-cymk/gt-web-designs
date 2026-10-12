let cart = [];
let total = 0;

function addToCart(productName, price) {
    cart.push({
        name: productName,
        price: price
    });

    total += price;

    // Update the cart number
    document.getElementById("cart-count").textContent = cart.length;

    // Show confirmation
    alert(
        productName + " added to your cart!\n\n" +
        "Items in cart: " + cart.length + "\n" +
        "Total: ₦" + total.toLocaleString()
    );
}
