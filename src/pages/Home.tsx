import ServiceCard from "../components/ServiceCard";

const services = [
  { title: "Чистка от пыли", description: "Профилактическая чистка ПК и ноутбуков." },
  { title: "Замена комплектующих", description: "Установка новых деталей." },
  { title: "Настройка Windows", description: "Переустановка и настройка операционной системы." },
];

const Home = () => (
  <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    {services.map((service, i) => (
      <ServiceCard key={i} {...service} />
    ))}
  </main>
);

export default Home;
