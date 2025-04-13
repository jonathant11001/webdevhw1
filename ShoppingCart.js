document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItemsElement = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartIcon = document.getElementById("cart-icon");
    totalPriceElement.textContent = "0.00";

    function updateCart() {
        cartItemsElement.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsElement.innerHTML = "<li>Cart is empty</li>";
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement("li");
                li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
                
                const removeBtn = document.createElement("button");
                removeBtn.textContent = "Remove";
                removeBtn.onclick = () => {
                    cart.splice(index, 1);
                    updateCart();
                };

                li.appendChild(removeBtn);
                cartItemsElement.appendChild(li);
                total += item.price * item.quantity;
            });

            const clearBtn = document.createElement("button");
            clearBtn.textContent = "Remove All";
            clearBtn.classList.add("remove-all-btn");
            clearBtn.onclick = () => {
                cart.length = 0;
                updateCart();
            };
            cartItemsElement.appendChild(clearBtn);
        }

        totalPriceElement.textContent = total.toFixed(2);
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    cartIcon.addEventListener("click", () => {
        cartItemsElement.classList.toggle("active");
        updateCart();
    });
});
