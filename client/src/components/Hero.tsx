import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-violet-600 text-white py-24 px-6 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
        Профессиональный ремонт компьютеров
      </h1>
      <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
        Быстро и качественно восстановим вашу технику, чтобы вы могли работать без перебоев.
      </p>
      <a
        href="#contact"
        className="inline-block bg-white text-violet-700 font-semibold px-10 py-4 rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Связаться с нами
      </a>
    </section>
  );
};

export default Hero;