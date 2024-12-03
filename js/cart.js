export const cartFunction = () => {
  const $addToCartButton = document.querySelectorAll('.add-to-cart');
  const $cartCount = document.getElementById('cart-counter');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updateCartCount = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    $cartCount.textContent = totalItems;
  };

  const addToCart = (productId, productName, productPrice) => {
    const existingProduct = cart.find((item) => item.productId === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      const newProduct = {
        productId: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
      };
      cart.push(newProduct);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  };

  $addToCartButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const productId = e.target.id;
      const productName = productCard.querySelector('.product-name').textContent;
      const productPrice = parseFloat(
        productCard.querySelector('.product-price').textContent.replace('$', '')
      );
      addToCart(productId, productName, productPrice);
    });
  });
  updateCartCount();
};
