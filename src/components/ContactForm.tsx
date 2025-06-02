import React, { useState } from 'react';
import { Notification } from './Notification';     

export const ContactForm: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь отправка данных формы, например fetch/post

    // После успешной отправки показываем уведомление
    setShowNotification(true);

    // Через 3 секунды скрываем уведомление
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section id="contact" className="max-w-md mx-auto p-6 bg-white rounded shadow my-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ваше имя"
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Сообщение"
          required
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-violet-500">
          Отправить
        </button>
      </form>

      {showNotification && (
        <Notification message="Спасибо за ваше сообщение!" onClose={() => setShowNotification(false)} />
      )}
    </section>
  );
};
export default ContactForm;