import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

const services = [
  {
    title: 'Диагностика и ремонт ПК',
    description: 'Полная диагностика и устранение неисправностей любой сложности.',
  },
  {
    title: 'Настройка программного обеспечения',
    description: 'Установка, настройка и обновление программ.',
  },
  {
    title: 'Чистка и профилактика',
    description: 'Чистка компьютера от пыли и профилактические работы для продления срока службы.',
  },
];

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
      <Hero />
      <section id="services" className="container mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        {services.map(service => (
          <ServiceCard key={service.title} title={service.title} description={service.description} />
        ))}
      </section>
      <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
