
import React from 'react';
import { ServiceCard } from '../components/ServiceCard';

export const ServicesPage: React.FC = () => {
  return (
    <div className="py-16 px-4 container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Наши услуги</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard
          title="Ремонт ПК"
          description="Починка, чистка, апгрейд, замена деталей." shortDescription={''} fullDescription={''} image={''}        />
        <ServiceCard
          title="Установка Windows и Linux"
          description="Переустановка ОС, настройка драйверов и софта." shortDescription={''} fullDescription={''} image={''}        />
        <ServiceCard
          title="Удалённая помощь"
          description="Решение проблем через интернет." shortDescription={''} fullDescription={''} image={''}        />
      </div>
    </div>
  );
};



export default ServicesPage;