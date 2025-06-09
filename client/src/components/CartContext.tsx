import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  id: number;
  service: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

// Добавляем интерфейс пропсов для CartProvider
interface CartProviderProps {
  children: ReactNode;
  userId: number | null;  // userId теперь приходит сюда
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      return;
    }
    // Загрузка корзины с сервера для userId
    async function fetchCart() {
      try {
        const res = await fetch(`/api/cart?userId=${userId}`);
        if (!res.ok) throw new Error('Ошибка загрузки корзины');
        const data: CartItem[] = await res.json();
        setCartItems(data);
      } catch (e) {
        console.error('Failed to fetch cart:', e);
      }
    }
    fetchCart();
  }, [userId]);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    if (!userId) {
      throw new Error('User is not logged in');
    }
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, service: item.service, price: item.price, quantity: 1 }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Неизвестная ошибка');
    }
    setCartItems(prev => {
      const exist = prev.find(ci => ci.id === item.id);
      if (exist) {
        return prev.map(ci => (ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(ci => ci.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(ci => (ci.id === id ? { ...ci, quantity } : ci)));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
