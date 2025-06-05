import React, { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Notification } from '../components/Notification';
import { motion } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  description: string;
  price: number;
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Диагностика компьютера',
    shortDescription: 'Быстрая и точная проверка',
    fullDescription: 'Полная диагностика всех компонентов ПК для выявления проблем.',
    image: '',
    description: 'Диагностика компьютера',
    price: 1000,
  },
  {
    id: 2,
    title: 'Установка Windows',
    shortDescription: 'Лицензионная установка Windows 10/11',
    fullDescription: 'Полная переустановка Windows с драйверами и настройкой.',
    image: '',
    description: 'Установка Windows',
    price: 1500,
  },
];

export const ServicesPage: React.FC = () => {
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const handleAddToCart = (service: Service) => {
    addToCart({
      id: service.id,
      service: service.title,
      price: service.price,
    });
    setNotificationMessage(`"${service.title}" добавлена в корзину`);
  };

  return (
    <main className="bg-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-violet-700">Наши услуги</h1>
            <p className="text-gray-600 mt-2">
              Мы предлагаем широкий спектр сервисных услуг для вашего ПК или ноутбука.
            </p>
          </div>

          <button
            onClick={() => navigate('/profile/cart')}
            className="relative bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            🛒 Перейти в корзину
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ServiceCard
                {...service}
                onAddToCart={() => handleAddToCart(service)} // ⬅️ кастомное поведение
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notification */}
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          onClose={() => setNotificationMessage(null)}
        />
      )}
    </main>
  );
};

export default ServicesPage;
