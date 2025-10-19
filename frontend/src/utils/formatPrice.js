// Formatear el precio de los productos, src/utils/formatPrice.js

export const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice) || price === null || price === undefined) return 'Consultar';
  return `$${Math.abs(numericPrice).toLocaleString('es-AR')}/año`;
};
