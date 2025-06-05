import React, { useState } from 'react';

type Tab = 'profile' | 'orders' | 'cart';

interface Order {
  id: number;           // id как number, т.к. в Prisma Int
  createdAt: string;    // дата как ISO строка
  status: string;       // статус — строка
  service: string;      // услуга (если надо)
  // total можно добавить, если считаешь нужным
}

interface CartItem {
  id: number;
  service: string;
  price: number;
  quantity: number;
}

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  // Пример пользователя (из API или стейта)
  const [user, setUser] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  // Пример заказов (здесь лучше получать из API)
  const [orders] = useState<Order[]>([
    { id: 1, createdAt: '2025-05-01T10:00:00Z', status: 'Выполнен', service: 'Чистка от пыли' },
    { id: 2, createdAt: '2025-05-10T15:30:00Z', status: 'В обработке', service: 'Замена комплектующих' },
  ]);

  // Пример корзины
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, service: 'Чистка от пыли', price: 1000, quantity: 1 },
    { id: 2, service: 'Замена комплектующих', price: 2500, quantity: 2 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveProfile = () => {
    setUser(formData);
    setEditMode(false);
    // Тут вызови API для сохранения, если надо
  };

  const handleRemoveCartItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Личный кабинет</h1>

      {/* Навигация по вкладкам */}
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

      {/* Контент вкладок */}
      {activeTab === 'profile' && (
        <section>
          {!editMode ? (
            <div className="space-y-4">
              <p>
                <strong>Имя:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
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
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </label>
              <label className="block">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                />
              </label>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditMode(false)}
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
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-violet-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Номер заказа</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Дата</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Статус</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Услуга</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-violet-50">
                    <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                    <td className="border border-gray-300 px-4 py-2">{order.service}</td>
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
                    />
                    <button
                      onClick={() => handleRemoveCartItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                      aria-label={`Удалить ${item.service} из корзины`}
                    >
                      &times;
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
