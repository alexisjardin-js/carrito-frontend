import { cartFunction } from './cart.js';

const API_URL = 'http://localhost:3001/api/products';

const data = async () => {
  const $container = document.getElementById('product-conntainer');

  try {
    const response = await fetch(API_URL);
    const products = await response.json();

    products.map((product) => {
      const productHTML = `<div class="product-card">
            <img src="img/products/${product._id}.webp" alt="${product.name}">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-price">${product.price}</p>
            <p class="product-description">${product.description}</p>
            <div class="container-cart">
                <button id="${product._id}" class="add-to-cart">Agregar al carrito</button>
            </div>`;
      $container.innerHTML += productHTML;
      cartFunction();
    });
  } catch (error) {
    console.error('error al obtener los productos', error);
  }
};

data();
