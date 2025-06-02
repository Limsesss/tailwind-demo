import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-violet-500 text-white py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Профессиональный ремонт компьютеров</h2>
      <p className="text-lg max-w-xl mx-auto">Быстро и качественно восстановим вашу технику</p>
    </section>
  );
};

export default Hero;