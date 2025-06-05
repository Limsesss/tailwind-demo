
import React from 'react';
import { ServiceCard } from '../components/ServiceCard';

export const ServicesPage: React.FC = () => {
  return (
    <main className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-violet-700">Наши услуги</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            title="Ремонт ПК"
            shortDescription="Починка, чистка, апгрейд, замена деталей."
            fullDescription={`Мы выполняем комплексный ремонт персональных компьютеров:
- Диагностика неисправностей
- Замена комплектующих (жёсткие диски, оперативная память, видеокарты)
- Чистка от пыли и охлаждающих систем
- Установка и настройка драйверов и ПО

Гарантируем качественный сервис и индивидуальный подход.`}
            image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
            description="Починка, чистка, апгрейд, замена деталей."
          />
          <ServiceCard
            title="Установка Windows и Linux"
            shortDescription="Переустановка ОС, настройка драйверов и софта."
            fullDescription={`Оказываем услуги по установке и настройке операционных систем Windows и Linux:
- Установка с нуля или обновление
- Настройка драйверов и необходимого ПО
- Оптимизация системы для лучшей производительности
- Консультации и обучение работе с системой

Делаем работу вашего ПК стабильной и быстрой.`}
            image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
            description="Переустановка ОС, настройка драйверов и софта."
          />
          <ServiceCard
            title="Удалённая помощь"
            shortDescription="Решение проблем через интернет."
            fullDescription={`Предоставляем удалённую поддержку для быстрого решения ваших проблем:
- Настройка удалённого доступа
- Диагностика и устранение неполадок через интернет
- Помощь с программным обеспечением и настройками
- Консультации и рекомендации

Экономьте время и получайте помощь без визита мастера.`}
            image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
            description="Решение проблем через интернет."
          />
        </div>
      </div>
    </main>
  );
};
export default ServicesPage;