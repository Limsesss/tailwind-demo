import React from 'react';

export const Header = () => (
  <header className="bg-violet-400 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Ремонт компьютерной техники "FixikPro"</h1>
      <nav>
        <a href="#services" className="mr-4 hover:underline">Услуги</a>
        <a href="#contact" className="hover:underline">Контакты</a>
      </nav>
    </div>
  </header>
);

export default Header;
