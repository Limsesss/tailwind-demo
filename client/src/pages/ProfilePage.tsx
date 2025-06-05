import React, { useState } from 'react';

export const ProfilePage: React.FC = () => {
  // Пока простой стейт, в реальности сюда приходит инфа с бэкенда или из контекста авторизации
  const [user, setUser] = useState({
    name: 'Иван Иванов',
    email: 'ivan@example.com',
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
    // тут обычно вызывается API для сохранения на сервер
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Личный кабинет</h1>

      {!editMode ? (
        <div className="space-y-4 bg-white p-6 rounded shadow">
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
        <div className="space-y-4 bg-white p-6 rounded shadow">
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
              onClick={handleSave}
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
    </main>
  );
};

export default ProfilePage;