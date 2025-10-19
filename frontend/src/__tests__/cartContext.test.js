import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const product1 = { id: 1, name: 'Product 1', price: 100 };
const product2 = { id: 2, name: 'Product 2', price: 200 };

describe('CartContext - Agregar y Eliminar Ítems', () => {
  let store = {};

  beforeEach(() => {
    store = {}; // Reiniciar el store antes de cada test
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value + ''; }),
        removeItem: jest.fn((key) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
      },
      writable: true,
    });
  });

  afterEach(() => {
    // No es necesario restaurar los mocks ya que reemplazamos el objeto completo
    // y beforeEach lo reinicia
  });

  it('should add a new item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(product1);
    });

    expect(result.current.cartItems).toEqual([{ ...product1, quantity: 1 }]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ ...product1, quantity: 1 }]));
  });

  it('should increase quantity if item already exists in cart', () => {
    window.localStorage.setItem('cart', JSON.stringify([{ ...product1, quantity: 1 }])); // Pre-popular el carrito
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addToCart(product1);
    });

    expect(result.current.cartItems).toEqual([{ ...product1, quantity: 2 }]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ ...product1, quantity: 2 }]));
  });

  it('should remove an item from the cart', () => {
    window.localStorage.setItem('cart', JSON.stringify([{ ...product1, quantity: 1 }, { ...product2, quantity: 1 }])); // Pre-popular el carrito
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.removeFromCart(product1.id);
    });

    expect(result.current.cartItems).toEqual([{ ...product2, quantity: 1 }]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ ...product2, quantity: 1 }]));
  });

  it('should do nothing if removing a non-existent item', () => {
    window.localStorage.setItem('cart', JSON.stringify([{ ...product1, quantity: 1 }])); // Pre-popular el carrito
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.removeFromCart(999); // ID no existente
    });

    expect(result.current.cartItems).toEqual([{ ...product1, quantity: 1 }]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ ...product1, quantity: 1 }]));
  });

  it('should clear the cart', () => {
    window.localStorage.setItem('cart', JSON.stringify([{ ...product1, quantity: 1 }, { ...product2, quantity: 1 }])); // Pre-popular el carrito
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
  });

  // Nuevos tests para getCartTotal y getCartPriceTotal
  it('should return the correct total number of items', () => {
    window.localStorage.setItem('cart', JSON.stringify([{ ...product1, quantity: 2 }, { ...product2, quantity: 3 }]));
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    expect(result.current.getCartTotal()).toBe(5);
  });

  it('should return 0 total items for an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    expect(result.current.getCartTotal()).toBe(0);
  });

  it('should return the correct total price of items', () => {
    window.localStorage.setItem('cart', JSON.stringify([{ ...product1, quantity: 2 }, { ...product2, quantity: 3 }]));
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    // product1: 100 * 2 = 200
    // product2: 200 * 3 = 600
    // Total: 800
    expect(result.current.getCartPriceTotal()).toBe(800);
  });

  it('should return 0 total price for an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    expect(result.current.getCartPriceTotal()).toBe(0);
  });
});
