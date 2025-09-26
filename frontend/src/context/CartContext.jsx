import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const addItem = (product, rest) => {
    if (restaurant && restaurant._id !== rest._id) {
      setItems([]);
    }
    setRestaurant(rest);
    setItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity: Math.max(quantity, 1) } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurant(null);
  };

  const total = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total, clearCart, restaurant }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
