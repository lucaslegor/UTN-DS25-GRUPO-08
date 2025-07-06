import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Hook personalizado para localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  // Calcular total de items en el carrito
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calcular precio total
  const getCartPriceTotal = () => {
    return cartItems.reduce((total, item) => {
      if (typeof item.price !== 'number') return total;
      return total + item.price * item.quantity;
    }, 0);
  };
  
  

  // Validar si un producto puede ser agregado
  const canAddToCart = (product) => {
    if (!product || !product.id) return false;
    
    const existingItem = cartItems.find(item => item.id === product.id);
    // Limitar a 10 items por producto
    return !existingItem || existingItem.quantity < 10;
  };

  const addToCart = (product) => {
    if (!canAddToCart(product)) {
      alert('No se puede agregar más de 10 unidades del mismo producto');
      return;
    }

    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    if (newQuantity > 10) {
      alert('No se puede agregar más de 10 unidades del mismo producto');
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const isCartEmpty = cartItems.length === 0;

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartPriceTotal,
      canAddToCart,
      isCartEmpty
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
