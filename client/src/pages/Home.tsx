import React from "react";
import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";
import FAQSection from "../components/FAQSection";
import BackgroundWaves from "../components/BackgroundWaves";

const services = [
  {
    id: 1,
    title: 'Диагностика компьютера',
    shortDescription: 'Определим проблему и подскажем, что делать.',
    fullDescription: 'Проводим аппаратную и программную диагностику для выявления причин неисправности. Включает проверку всех основных компонентов (жёсткий диск, оперативная память, питание, температура и т.д.)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    price: 1000,
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
    id: 3,
    title: "Настройка Windows",
    shortDescription: "Переустановка и настройка операционной системы.",
    fullDescription:
      "Переустанавливаем Windows, настраиваем драйверы, обеспечиваем безопасность и оптимизацию для максимальной производительности.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    price: 1500,
  },
];

const Home: React.FC = () => {
  return (
    <main className="relative bg-gray-50 min-h-screen py-16 px-4 overflow-hidden">
      <BackgroundWaves />

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-violet-700 mb-4">
          Профессиональный ремонт компьютеров и ноутбуков
        </h1>
        <p className="text-gray-600 text-lg">
          Быстро. Качественно. С гарантией. Мы решим любую техническую проблему!
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto mb-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center relative z-10">
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

      <section className="max-w-6xl mx-auto my-24 px-4 relative z-10">
        <h2 className="text-3xl font-bold text-violet-700 mb-10 text-center">Как мы работаем</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-violet-600">1. Заявка</h3>
            <p className="text-gray-600">Оставляете заявку на сайте или звоните нам.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-violet-600">2. Диагностика</h3>
            <p className="text-gray-600">Проводим проверку и озвучиваем стоимость ремонта.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-violet-600">3. Ремонт</h3>
            <p className="text-gray-600">Выполняем ремонт и тестируем технику.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-violet-600">4. Готово!</h3>
            <p className="text-gray-600">Вы получаете исправное устройство с гарантией.</p>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="max-w-6xl mx-auto my-24 px-4 relative z-10">
        <h2 className="text-3xl font-bold text-violet-700 mb-10 text-center">Отзывы клиентов</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 italic">"Отдал ноутбук на чистку — сделали в тот же день, теперь работает тише и не греется. Спасибо!"</p>
            <p className="mt-4 text-violet-700 font-semibold">— Алексей К.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 italic">"Установили SSD и Windows — теперь компьютер просто летает. Очень доволен!"</p>
            <p className="mt-4 text-violet-700 font-semibold">— Ирина Л.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 italic">"Ребята приехали на дом, быстро всё настроили и объяснили, как пользоваться. Отличный сервис."</p>
            <p className="mt-4 text-violet-700 font-semibold">— Дмитрий С.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto relative z-10">
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
