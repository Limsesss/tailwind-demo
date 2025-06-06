import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  service: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>; // теперь async
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      // Предположим, у тебя есть userId где-то в app
      const USER_ID = 1; // Заменить на реальный userId из auth или контекста

      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: USER_ID, service: item.service, price: item.price, quantity: 1 }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Неизвестная ошибка');
      }

      // Обновляем локальный стейт
      setCartItems(prev => {
        const exist = prev.find(ci => ci.id === item.id);
        if (exist) {
          return prev.map(ci =>
            ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    } catch (error) {
      // Можно прокидывать ошибку дальше или логировать
      throw error;
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(ci => ci.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(ci => (ci.id === id ? { ...ci, quantity } : ci))
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
