const CHECkOUT_URL = 'http://localhost:3001/api/orders';

const $cartCount = document.getElementById('cart-counter');
const $cartTableBody = document.getElementById('cart-table').querySelector('tbody');
const $checkoutButton = document.getElementById('checkout');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const updateCartCount = () => {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  $cartCount.textContent = totalItems;
};

const renderCart = () => {
  $cartTableBody.innerHTML = '';

  if (cart.length === 0) {
    $cartTableBody.innerHTML = `<tr><td colspan="5">El carrito esta vació</td></tr>`;
    return;
  }

  const rowsHTML = cart
    .map(
      (item) => `
     <tr>
     <td>${item.name}</td>
     <td>${item.price.toFixed(2)}</td>
     <td>${item.quantity}</td>
     <td>$${(item.price * item.quantity).toFixed(2)}</td>
     <td><img class="delete" data-id="${item.productId}" src="/img/trash.svg"/></td>
     </tr>
    `
    )
    .join('');
  $cartTableBody.innerHTML = rowsHTML;

  attachDeleteEvent();
};

const checkout = async () => {
  if (cart.length === 0) {
    alert('el carrito esta vació');
    return;
  }

  try {
    const response = await fetch(CHECkOUT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    });

    if (response.ok) {
      localStorage.clear('cart');
      cart = [];
      renderCart();
      updateCartCount();
      alert('Compra realizada con exito');
    } else {
      alert('error al procesar la compra');
    }
  } catch (error) {
    console.error('Error en el checkout:', error);
    alert('hubo un problema al finalizar la compra');
  }
};

const deleteCartItem = (productId) => {
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
};

const attachDeleteEvent = () => {
  const deleteButtons = document.querySelectorAll('.delete');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      deleteCartItem(productId);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartCount();
  $checkoutButton.addEventListener('click', checkout);
});
