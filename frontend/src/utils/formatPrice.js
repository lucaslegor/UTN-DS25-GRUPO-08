// Formatear el precio de los productos, src/utils/formatPrice.js

export const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return 'Consultar';
  return `$${numericPrice.toLocaleString('es-AR')}/año`;
};
