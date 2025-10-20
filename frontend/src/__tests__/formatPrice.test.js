import { formatPrice } from '../utils/formatPrice';

describe('formatPrice', () => {
  // Debería formatear un número entero positivo correctamente
  it('should format a positive integer correctly', () => {
    expect(formatPrice(10000)).toBe('$10.000/año');
  });

  // Debería formatear un número decimal correctamente
  it('should format a decimal number correctly', () => {
    expect(formatPrice(12345.67)).toBe('$12.345,67/año');
  });

  // Debería formatear cero correctamente
  it('should format zero correctly', () => {
    expect(formatPrice(0)).toBe('$0/año');
  });

  // Debería manejar números negativos formateando el valor absoluto
  it('should handle negative numbers by formatting the absolute value', () => {
    expect(formatPrice(-5000)).toBe('$5.000/año');
  });

  // Debería retornar "Consultar" para entradas no numéricas
  it('should return "Consultar" for non-numeric input', () => {
    expect(formatPrice('abc')).toBe('Consultar');
    expect(formatPrice(null)).toBe('Consultar');
    expect(formatPrice(undefined)).toBe('Consultar');
  });

  // Debería formatear números grandes correctamente
  it('should format large numbers correctly', () => {
    expect(formatPrice(123456789.01)).toBe('$123.456.789,01/año');
  });
});
