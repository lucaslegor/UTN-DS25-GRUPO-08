document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.getElementById('addToCartButton');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      alert('¡Agregado al carrito correctamente!');
      addToCartButton.textContent = 'Agregado';
      addToCartButton.style.backgroundColor = '#28a745'; 
      addToCartButton.disabled = true;
    });
  }
});