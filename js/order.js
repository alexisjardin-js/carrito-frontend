let cart = JSON.parse(localStorage.getItem('cart')) || [];

const ORDER_URL = 'http://localhost:3001/api/orders';

const $cartCount = document.getElementById('cart-counter');

const $cartTableBody = document.getElementById('cart-table').querySelector('tbody');

const data = async () => {
  const response = await fetch(ORDER_URL);
  const orders = await response.json();

  const renderOrder = () => {
    $cartTableBody.innerHTML = '';

    if (orders.length === 0) {
      $cartTableBody.innerHTML = `<tr><td colspan="5"> No hay compras realizadas </td></tr>`;
      return;
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const rowsHTML = orders
      .map(
        (item) => `
          <tr>
           <td>${item._id}</td>
           <td>${new Date(item.date).toDateString('es-ES', options)}</td>
           <td>${item.items.map((product) => product.name).join(',')}</td>
           <td>${item.totalPrice.toFixed(2)}</td>
          </tr>
        `
      )
      .join('');

    $cartTableBody.innerHTML = rowsHTML;

    const updateCartCount = () => {
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      $cartCount.textContent = totalItems;
    };
    updateCartCount();
  };
  renderOrder();
};

document.addEventListener('DOMContentLoaded', () => {
  data();
});
