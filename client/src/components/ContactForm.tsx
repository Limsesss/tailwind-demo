import React, { useState } from 'react';
import { Notification } from './Notification';

export const ContactForm: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        form.reset();
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      } else {
        alert('Ошибка при отправке формы');
      }
    } catch (err) {
      alert('Ошибка сети');
    }
  };

  return (
    <section id="contact" className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg my-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Мы вам поможем!</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          type="text"
          placeholder="Ваше имя"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
        <textarea
          name="message"
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
