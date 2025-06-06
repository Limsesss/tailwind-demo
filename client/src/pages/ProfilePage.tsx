import React, { useEffect, useState } from 'react';

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

const USER_ID = 1; // Пока хардкод, потом заменить на авторизацию

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchUser(), fetchOrders(), fetchCart()]);
    } catch (e) {
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    const res = await fetch(`/api/profile/${USER_ID}`);
    if (!res.ok) throw new Error('Ошибка загрузки профиля');
    const data = await res.json();
    setUser(data);
    setFormData(data);
  };

  const fetchOrders = async () => {
    const res = await fetch(`/api/orders/${USER_ID}`);
    if (!res.ok) throw new Error('Ошибка загрузки заказов');
    const data = await res.json();
    setOrders(data);
  };

  const fetchCart = async () => {
    const res = await fetch(`/api/cart/${USER_ID}`);
    if (!res.ok) throw new Error('Ошибка загрузки корзины');
    const data = await res.json();
    setCartItems(data);
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
      const res = await fetch(`/api/profile/${USER_ID}`, {
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
      const res = await fetch(`/api/cart/${USER_ID}/${id}`, { method: 'DELETE' });
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
      const res = await fetch(`/api/cart/${USER_ID}/${id}`, {
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

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Личный кабинет</h1>

      <nav className="flex justify-center space-x-8 mb-8 border-b">
        {(['profile', 'orders', 'cart'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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
            <div className="space-y-4">
              <label className="block">
                Имя
                <input
                  type="text"
                  name="name"
                  value={formData?.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  disabled={loading}
                />
              </label>
              <label className="block">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData?.email || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  disabled={loading}
                />
              </label>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={loading}
                >
                  Сохранить
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setFormData(user);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  disabled={loading}
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
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-violet-100">
                  <th className="border px-4 py-2">№</th>
                  <th className="border px-4 py-2">Дата</th>
                  <th className="border px-4 py-2">Статус</th>
                  <th className="border px-4 py-2">Услуга</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">{order.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {activeTab === 'cart' && (
        <section>
          {cartItems.length === 0 ? (
            <p>Ваша корзина пуста.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between border rounded p-4">
                  <div>
                    <h3 className="font-semibold">{item.service}</h3>
                    <p>Цена: {item.price.toLocaleString()} ₽</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, +e.target.value)}
                      className="w-16 border rounded px-2 py-1 text-center"
                      disabled={loading}
                    />
                    <button
                      onClick={() => handleRemoveCartItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right font-bold text-xl">
                Итого: {totalCartPrice.toLocaleString()} ₽
              </div>
              <button
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => alert('Оформление заказа пока не реализовано')}
                disabled={loading}
              >
                Оформить заказ
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default ProfilePage;
