import React from "react";
import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Чистка от пыли",
    shortDescription: "Профилактическая чистка ПК и ноутбуков.",
    fullDescription:
      "Проводим тщательную чистку внутренних компонентов вашего компьютера или ноутбука, чтобы улучшить охлаждение и продлить срок службы техники.",
    image:
      "https://images.unsplash.com/photo-1587825140408-cd64ec2db156?auto=format&fit=crop&w=600&q=80",
    description: "Профилактическая чистка ПК и ноутбуков.",
    price: 1000,
  },
  {
    id: 2,
    title: "Замена комплектующих",
    shortDescription: "Установка новых деталей.",
    fullDescription:
      "Заменяем и устанавливаем новые комплектующие — от оперативной памяти до видеокарт — с гарантией качества и совместимости.",
    image:
      "https://images.unsplash.com/photo-1581091870621-1bf580f82eec?auto=format&fit=crop&w=600&q=80",
    description: "Установка новых деталей.",
    price: 2000,
  },
  {
    id: 3,
    title: "Настройка Windows",
    shortDescription: "Переустановка и настройка операционной системы.",
    fullDescription:
      "Переустанавливаем Windows, настраиваем драйверы, обеспечиваем безопасность и оптимизацию для максимальной производительности.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    description: "Переустановка и настройка ОС.",
    price: 1500,
  },
];

const Home: React.FC = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-4">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-violet-700 mb-4">
          Профессиональный ремонт компьютеров и ноутбуков
        </h1>
        <p className="text-gray-600 text-lg">
          Быстро. Качественно. С гарантией. Мы решим любую техническую проблему!
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mb-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-violet-600 mb-2">Гарантия</h3>
          <p className="text-gray-600">На все услуги распространяется гарантия до 6 месяцев.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-violet-600 mb-2">Быстрая работа</h3>
          <p className="text-gray-600">Диагностика и ремонт в течение одного дня.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-violet-600 mb-2">Доступные цены</h3>
          <p className="text-gray-600">Прозрачная ценовая политика и без навязывания услуг.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-violet-700 mb-8 text-center">Популярные услуги</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
