import React from 'react';

export const ContactsPage: React.FC = () => {
  return (
    <main className="relative min-h-screen bg-gray-50 py-16 px-4 overflow-hidden">
      {/* Фоновая волна с низким z-index */}
      <div className="absolute inset-0 -z-10">
        {/* Подключи BackgroundWaves, если нужно */}
        {/* <BackgroundWaves /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-white opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl bg-white rounded-xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-violet-700">Контакты</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Левая часть — Контактная информация */}
          <section className="flex-1 space-y-6 text-gray-700 text-lg">
            <div>
              <p><strong>Адрес:</strong> г. Псков, ул. Ремонтная, д. 15</p>
              <p><strong>Часы работы:</strong> Пн–Сб: 10:00–20:00, Вс: выходной</p>
              <p>
                <strong>Телефон:</strong>{' '}
                <a href="tel:+78123456789" className="text-violet-600 hover:underline">
                  +7 (812) 345-67-89
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@remont-pc.ru" className="text-violet-600 hover:underline">
                  support@remont-pc.ru
                </a>
              </p>
            </div>

            {/* Форма */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-violet-700 mb-4">Напишите нам</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Сообщение"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>

            {/* Соцсети */}
            <div className="mt-8 flex space-x-6">
              <a
                href="https://t.me/yourtelegram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 hover:text-violet-800 transition"
                aria-label="Telegram"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.93 3.63a1.5 1.5 0 00-1.71-.37L3.67 10.42a1 1 0 00.2 1.9l4.77 1.32 1.14 3.87a.75.75 0 001.3.24l1.87-1.88 3.94 2.91a1.5 1.5 0 002.34-1.34L23 5.13a1.5 1.5 0 00-1.07-1.5z" />
                </svg>
              </a>
              <a
                href="https://vk.com/yourvk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 hover:text-violet-800 transition"
                aria-label="VK"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zM7.2 15.1c-.1.3-.2.3-.4.3h-1.4a.5.5 0 01-.5-.5v-3.1c0-.3.1-.4.3-.4h1.2a.2.2 0 01.2.2l.1.9c.1.4.2.6.3.7a2.6 2.6 0 001.1.9c.5.3.6.5.3.8a.7.7 0 01-.6.1c-.1 0-.3 0-.4-.2zm7.7-2.4a.3.3 0 00-.4-.2c-.7.3-1.4.6-2 .8-.1 0-.2 0-.2-.1v-1a.2.2 0 00-.2-.2h-1.1a.2.2 0 00-.2.2v4.2c0 .2 0 .2.2.2h1a.8.8 0 00.6-.3l.8-1.1c.3-.4.4-.5.6-.5a.4.4 0 00.3-.3v-1.5z" />
                </svg>
              </a>
            </div>
          </section>

          {/* Правая часть — Карта */}
          <section className="flex-1 rounded overflow-hidden shadow-md h-[300px]">
            <iframe
              title="Наш адрес"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.123456789!2d28.329999!3d57.819999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46c57030e8a1eb2b%3A0x6c0e4d9a1b9a8c2d!2z0JLQsNC70LDRgNC-0YHQutC40L3QsNC90YvQuSDQntGA0LjQutCw!5e0!3m2!1sru!2sru!4v1686063539123!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactsPage;