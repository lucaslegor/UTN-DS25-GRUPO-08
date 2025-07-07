export const formatPrice = (price) => {
    if (typeof price !== 'number') return 'Consultar';
    return `$${price.toLocaleString('es-AR')}/año`;
  };