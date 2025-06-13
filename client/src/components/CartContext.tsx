import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

export interface CartItem {
  id: number;
  service: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  checkout: () => Promise<void>; // ✅ Добавлено
}

interface CartProviderProps {
  children: ReactNode;
  userId: number | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
  userId,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCart() {
      try {
        const res = await fetch(`/api/cart?userId=${userId}`, { signal });
        if (!res.ok) throw new Error('Ошибка загрузки корзины');
        const data: CartItem[] = await res.json();
        setCartItems(data);
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          console.error('Ошибка загрузки корзины:', e);
        }
      }
    }

    fetchCart();
    return () => controller.abort();
  }, [userId]);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    if (!userId) throw new Error('User is not logged in');

    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        service: item.service,
        price: item.price,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Ошибка добавления в корзину');
    }

    setCartItems((prev) => {
      const exist = prev.find((ci) => ci.id === data.id);
      if (exist) {
        return prev.map((ci) =>
          ci.id === data.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { ...item, id: data.id, quantity: 1 }];
    });
  };

  const removeFromCart = async (id: number) => {
    const res = await fetch(`/api/cart/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Ошибка удаления из корзины');
    }
    setCartItems((prev) => prev.filter((ci) => ci.id !== id));
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (quantity < 1) return;

    const res = await fetch(`/api/cart/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Ошибка обновления количества');
    }

    setCartItems((prev) =>
      prev.map((ci) => (ci.id === id ? { ...ci, quantity } : ci))
    );
  };

  const checkout = async () => {
    if (!userId || cartItems.length === 0) return;

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items: cartItems }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Ошибка оформления заказа');
    }

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
