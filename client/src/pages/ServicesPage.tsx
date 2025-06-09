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
  description: string;
  price: number;
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Диагностика компьютера',
    shortDescription: 'Определим проблему и подскажем, что делать.',
    fullDescription: 'Проводим аппаратную и программную диагностику для выявления причин неисправности. Включает проверку всех основных компонентов (жёсткий диск, оперативная память, питание, температура и т.д.)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'Диагностика компьютера',
    price: 1000,
  },
  {
    id: 2,
    title: 'Восстановление данных',
    shortDescription: 'Вернём утерянные файлы.',
    fullDescription: 'Восстановим удалённые, повреждённые или потерянные данные с HDD, SSD, флешек и карт памяти. Работаем даже с носителями, которые не читаются системой.',
    image: 'https://images.unsplash.com/photo-1562577309-2592ab84b1bc?auto=format&fit=crop&w=800&q=80',
    description: 'Восстановление данных',
    price: 5000,
  },
  {
    id: 3,
    title: 'Ремонт и замена комплектующих',
    shortDescription: 'Починим или заменим сломанные части',
    fullDescription: 'Выполняем ремонт или замену неисправных компонентов: материнских плат, жёстких дисков, оперативной памяти, видеокарт, процессоров, блоков питания и т.д. Работаем с настольными ПК и ноутбуками. Все детали подбираются индивидуально.',
    image: 'https://cdn.pixabay.com/photo/2016/03/27/19/24/computer-1283624_1280.jpg',
    description: 'Ремонт и замена комплектующих',
    price: 1000,
  },
  {
    id: 4,
    title: 'Установка Windows',
    shortDescription: 'Лицензионная установка Windows 10/11',
    fullDescription: 'Установка или переустановка ОС с полным набором драйверов и нужных программ. Возможна настройка под ваши задачи (офис, игры, работа, обучение). Включает оптимизацию и защиту от вирусов.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    description: 'Установка Windows',
    price: 1500,
  },
  {
    id: 5,
    title: 'Удаление вирусов и настройка безопасности',
    shortDescription: 'Удалим вредоносное ПО и защитим ПК.',
    fullDescription: 'Полная проверка системы на вирусы, трояны, рекламное и шпионское ПО. Удаление угроз, восстановление повреждённых файлов и системных настроек. Настроим антивирус и рекомендации по безопасности.',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80',
    description: 'Удалим вредоносное ПО и защитим ПК.',
    price: 500,
  },
  {
    id: 6,
    title: 'Чистка системы охлаждения',
    shortDescription: 'Устраним перегрев и шум.',
    fullDescription: 'Разбор и чистка ноутбуков или ПК от пыли, замена термопасты, проверка вентиляторов. Помогает предотвратить перегрев, продлить срок службы устройства и снизить уровень шума.',
    image: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cleaning-2089833_1280.jpg',
    description: 'Устраним перегрев и шум.',
    price: 1000,
  },
  {
    id: 7,
    title: 'Апгрейд и модернизация ПК',
    shortDescription: 'Сделаем ваш компьютер мощнее.',
    fullDescription: 'Проведём замену и установку новых комплектующих: SSD вместо HDD, добавление оперативной памяти, установка видеокарты и т.д. Консультация по выбору деталей включена.',
    image: 'https://cdn.pixabay.com/photo/2018/02/02/11/04/hardware-3120196_1280.jpg',
    description: 'Апгрейд и модернизация ПК',
    price: 2000,
  },
  {
    id: 8,
    title: 'Настройка сети и подключение устройств',
    shortDescription: 'Всё подключим и настроим.',
    fullDescription: 'Настроим интернет, Wi-Fi, локальные сети, роутеры, принтеры и другое периферийное оборудование. Обеспечим стабильную работу и защиту вашей домашней или офисной сети.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    description: 'Всё подключим и настроим.',
    price: 1200,
  },
  {
    id: 9,
    title: 'Выездной ремонт',
    shortDescription: 'Мастер приедет к вам.',
    fullDescription: 'Выезд специалиста на дом или в офис. Возможна диагностика, настройка, мелкий ремонт, установка ОС или подключение техники прямо на месте.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    description: 'Мастер приедет к вам.',
    price: 1500,
  },
  {
    id: 10,
    title: 'Сборка компьютеров под заказ',
    shortDescription: 'Индивидуальный ПК под любые задачи.',
    fullDescription: 'Соберём системный блок под ваши нужды — будь то офисный, игровой или рабочий компьютер. Подбор оптимальных комплектующих, сборка, установка ПО и тестирование.',
    image: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/technology-606763_1280.jpg',
    description: 'Индивидуальный ПК под любые задачи.',
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
      <BackgroundWaves />
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
