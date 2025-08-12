 document.addEventListener('DOMContentLoaded', () => {
      const nuevoButton = document.getElementById('nuevoButton');

      if (nuevoButton) {
        nuevoButton.addEventListener('click', () => {
          const productCards = document.querySelectorAll('.product-card');
          productCards.forEach((card, index) => {
            if (index >= 2) { 
              card.style.display = 'none';
            } else {
              card.style.display = ''; 
            }
          });
        });
      }
    });