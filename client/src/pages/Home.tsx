import React from "react";
import ServiceCard from "../components/ServiceCard";

const services = [
  {
    title: "Чистка от пыли",
    shortDescription: "Профилактическая чистка ПК и ноутбуков.",
    fullDescription:
      "Проводим тщательную чистку внутренних компонентов вашего компьютера или ноутбука, чтобы улучшить охлаждение и продлить срок службы техники.",
    image:
      "https://images.unsplash.com/photo-1587825140408-cd64ec2db156?auto=format&fit=crop&w=400&q=80",
    description: "Профилактическая чистка ПК и ноутбуков.",
  },
  {
    title: "Замена комплектующих",
    shortDescription: "Установка новых деталей.",
    fullDescription:
      "Заменяем и устанавливаем новые комплектующие — от оперативной памяти до видеокарт — с гарантией качества и совместимости.",
    image:
      "https://images.unsplash.com/photo-1581091870621-1bf580f82eec?auto=format&fit=crop&w=400&q=80",
    description: "Установка новых деталей.",
  },
  {
    title: "Настройка Windows",
    shortDescription: "Переустановка и настройка операционной системы.",
    fullDescription:
      "Переустанавливаем Windows, настраиваем драйверы, обеспечиваем безопасность и оптимизацию для максимальной производительности.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    description: "Переустановка и настройка операционной системы.",
  },
];

const Home: React.FC = () => (
  <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
    {services.map((service, i) => (
      <ServiceCard key={i} {...service} />
    ))}
  </main>
);

export default Home;
