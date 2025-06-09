import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative text-white py-28 px-6 text-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1602524817445-d2f4a5d31708?auto=format&fit=crop&w=1400&q=80"
        alt="Ремонт ПК"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
};

export default Hero;
