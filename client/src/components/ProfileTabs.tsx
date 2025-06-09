import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Tab = 'profile' | 'orders' | 'cart';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Order {
  id: number;
  createdAt: string;
  status: string;
  service: string;
}

interface CartItem {
  id: number;
  service: string;
  price: number;
  quantity: number;
}

interface ProfileTabsProps {
  userId: number;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ userId }) => {
  const { '*': activeTabParam } = useParams<{ '*': string }>(); // catch-all param
  const navigate = useNavigate();

  const activeTab = (activeTabParam as Tab) || 'profile';

  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (activeTab === 'profile') {
      fetchUser();
    } else if (activeTab === 'orders') {
      fetchOrders();
    } else if (activeTab === 'cart') {
      fetchCart();
    }
  }, [activeTab]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/${userId}`);
      if (!res.ok) throw new Error('Ошибка загрузки профиля');
      const data = await res.json();
      setUser(data);
      setFormData(data);
    } catch {
      setError('Ошибка загрузки профиля');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${userId}`);
      if (!res.ok) throw new Error('Ошибка загрузки заказов');
      const data = await res.json();
      setOrders(data);
    } catch {
      setError('Ошибка загрузки заказов');
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/${userId}`);
      if (!res.ok) throw new Error('Ошибка загрузки корзины');
      const data = await res.json();
      setCartItems(data);
    } catch {
      setError('Ошибка загрузки корзины');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSaveProfile = async () => {
    if (!formData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Ошибка сохранения профиля');
      setUser(formData);
      setEditMode(false);
    } catch {
      setError('Не удалось сохранить профиль');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCartItem = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cart/${userId}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Ошибка удаления из корзины');
      await fetchCart();
    } catch {
      setError('Не удалось удалить элемент из корзины');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id: number, quantity: number) => {
    if (quantity < 1) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/cart/${userId}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error('Ошибка обновления количества');
      await fetchCart();
    } catch {
      setError('Не удалось обновить количество');
    } finally {
      setLoading(false);
    }
  };

  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const onTabClick = (tab: Tab) => {
    navigate(tab === 'profile' ? '/profile' : `/profile/${tab}`);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Личный кабинет</h1>
        <button
          onClick={() => {
            localStorage.removeItem('userId');
            window.location.reload();
          }}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Выйти
        </button>
      </div>

      <nav className="flex justify-center space-x-8 mb-8 border-b">
        {(['profile', 'orders', 'cart'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`pb-2 text-lg font-medium ${
              activeTab === tab
                ? 'border-b-4 border-violet-600 text-violet-600'
                : 'text-gray-600 hover:text-violet-600'
            }`}
          >
            {tab === 'profile' && 'Профиль'}
            {tab === 'orders' && 'Заказы'}
            {tab === 'cart' && 'Корзина'}
          </button>
        ))}
      </nav>

      {loading && <p className="text-center text-gray-500">Загрузка...</p>}
      {error && <p className="text-center text-red-600 mb-4">{error}</p>}

      {activeTab === 'profile' && user && (
        <section>
          {!editMode ? (
            <div className="space-y-4">
              <p><strong>Имя:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
              >
                Редактировать
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-sm">
              <input
                name="name"
                value={formData?.name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Имя"
              />
              <input
                name="email"
                type="email"
                value={formData?.email || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setFormData(user);
                    setEditMode(false);
                    setError(null);
                  }}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {activeTab === 'orders' && (
        <section>
          {orders.length === 0 ? (
            <p>У вас пока нет заказов.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li key={order.id} className="border p-4 rounded shadow-sm">
                  <p><strong>Номер заказа:</strong> {order.id}</p>
                  <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Услуга:</strong> {order.service}</p>
                  <p><strong>Статус:</strong> {order.status}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {activeTab === 'cart' && (
        <section>
          {cartItems.length === 0 ? (
            <p>Ваша корзина пуста.</p>
          ) : (
            <div>
              <ul className="space-y-4 mb-4">
                {cartItems.map(item => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border p-4 rounded shadow-sm"
                  >
                    <div>
                      <p><strong>{item.service}</strong></p>
                      <p>Цена: {item.price} ₽</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, +e.target.value)}
                        className="w-16 p-1 border rounded text-center"
                      />
                      <button
                        onClick={() => handleRemoveCartItem(item.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-right font-bold text-lg">
                Итого: {totalCartPrice} ₽
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default ProfileTabs;