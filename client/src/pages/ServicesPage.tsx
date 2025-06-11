import React, { useState } from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { Notification } from '../components/Notification';
import { motion } from 'framer-motion';
import BackgroundWaves from '../components/BackgroundWaves';

interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  price: number;
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Диагностика компьютера',
    shortDescription: 'Определим проблему и подскажем, что делать.',
    fullDescription: 'Проводим аппаратную и программную диагностику для выявления причин неисправности. Включает проверку всех основных компонентов (жёсткий диск, оперативная память, питание, температура и т.д.)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    price: 1000,
  },
  {
    id: 2,
    title: 'Восстановление данных',
    shortDescription: 'Вернём утерянные файлы.',
    fullDescription: 'Восстановим удалённые, повреждённые или потерянные данные с HDD, SSD, флешек и карт памяти. Работаем даже с носителями, которые не читаются системой.',
    image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=800&q=80',
    price: 5000,
  },
  {
    id: 3,
    title: 'Ремонт и замена комплектующих',
    shortDescription: 'Починим или заменим сломанные части',
    fullDescription: 'Выполняем ремонт или замену неисправных компонентов...',
    image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80',
    price: 1000,
  },
  {
    id: 4,
    title: 'Установка Windows',
    shortDescription: 'Лицензионная установка Windows 10/11',
    fullDescription: 'Установка или переустановка ОС с полным набором драйверов и нужных программ. Возможна настройка под ваши задачи (офис, игры, работа, обучение). Включает оптимизацию и защиту от вирусов.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    price: 1500,
  },
  {
    id: 5,
    title: 'Удаление вирусов и настройка безопасности',
    shortDescription: 'Удалим вредоносное ПО и защитим ПК.',
    fullDescription: 'Полная проверка системы на вирусы, трояны, рекламное и шпионское ПО. Удаление угроз, восстановление повреждённых файлов и системных настроек. Настроим антивирус и рекомендации по безопасности.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80',

    price: 500,
  },
  {
    id: 6,
    title: 'Чистка системы охлаждения',
    shortDescription: 'Устраним перегрев и шум.',
    fullDescription: 'Разбор и чистка ноутбуков или ПК от пыли, замена термопасты, проверка вентиляторов. Помогает предотвратить перегрев, продлить срок службы устройства и снизить уровень шума.',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80',
    price: 1000,
  },
  {
    id: 7,
    title: 'Апгрейд и модернизация ПК',
    shortDescription: 'Сделаем ваш компьютер мощнее.',
    fullDescription: 'Проведём замену и установку новых комплектующих: SSD вместо HDD, добавление оперативной памяти, установка видеокарты и т.д. Консультация по выбору деталей включена.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Computer_icon.svg/800px-Computer_icon.svg.png',
    price: 2000,
  },
  {
    id: 8,
    title: 'Настройка сети и подключение устройств',
    shortDescription: 'Всё подключим и настроим.',
    fullDescription: 'Настроим интернет, Wi-Fi, локальные сети, роутеры, принтеры и другое периферийное оборудование. Обеспечим стабильную работу и защиту вашей домашней или офисной сети.',
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80',
    price: 1200,
  },
  {
    id: 9,
    title: 'Выездной ремонт',
    shortDescription: 'Мастер приедет к вам.',
    fullDescription: 'Выезд специалиста на дом или в офис. Возможна диагностика, настройка, мелкий ремонт, установка ОС или подключение техники прямо на месте.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    price: 1500,
  },
  {
    id: 10,
    title: 'Сборка компьютеров под заказ',
    shortDescription: 'Индивидуальный ПК под любые задачи.',
    fullDescription: 'Соберём системный блок под ваши нужды — будь то офисный, игровой или рабочий компьютер. Подбор оптимальных комплектующих, сборка, установка ПО и тестирование.',
    image: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/technology-606763_1280.jpg',
    price: 3000,
  },
];

export const ServicesPage: React.FC = () => {
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const handleAddToCart = async (service: Service) => {
  try {
    await addToCart({
      id: service.id,
      service: service.title,
      price: service.price,
    });
    setNotificationMessage(`"${service.title}" добавлена в корзину`);
  } catch (error) {
    alert('Ошибка добавления: ' + (error instanceof Error ? error.message : 'Неизвестная ошибка'));
  }
};

  

  return (
    <main className="relative bg-gray-50 min-h-screen py-16 px-4 overflow-hidden">
      {/* Фоновые волны — абсолютное позиционирование и низкий z-index */}
      <div className="absolute inset-0 -z-5">
        <BackgroundWaves />
      </div>

      {/* Контент поверх волн */}
      <div className="relative z-10 max-w-7xl mx-auto">
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

        {/* Сетка с карточками */}
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
                onAddToCart={() => handleAddToCart(service)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Уведомление */}
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
