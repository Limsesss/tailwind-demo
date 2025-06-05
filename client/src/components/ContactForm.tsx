import React, { useState } from 'react';
import { Notification } from './Notification';

export const ContactForm: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь отправка данных формы, например fetch/post

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <section id="contact" className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg my-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Мы вам поможем!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Ваше имя"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
        <textarea
          placeholder="Сообщение"
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
        <button
          type="submit"
          className="w-full bg-violet-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-violet-700 active:bg-violet-800 transition"
        >
          Отправить
        </button>
      </form>

      {showNotification && (
        <Notification
          message="Спасибо за ваше сообщение!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </section>
  );
};

export default ContactForm;