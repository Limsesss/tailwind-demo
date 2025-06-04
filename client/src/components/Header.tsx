import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <header className="bg-violet-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Ремонт компьютерной техники "FixikPro"</div>

      {/* Кнопка-бургер */}
      <button
        onClick={toggleMenu}
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        {/* Иконка бургера — три полоски */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            // Крестик, когда меню открыто
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Три линии, когда меню закрыто
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Навигация для десктопа */}
      <nav className={`${isOpen ? 'block' : 'hidden'} md:flex space-x-4`}>
          <Link to="/" className="hover:underline">Главная</Link>
          <Link to="/services" className="hover:underline">Услуги</Link>
          <Link to="/contacts" className="hover:underline">Контакты</Link>
        </nav>

      {/* Мобильное меню */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-gray-800 text-white flex flex-col space-y-2 p-4 md:hidden z-10">
          <a href="#hero" className="hover:underline" onClick={() => setIsOpen(false)}>Главная</a>
          <a href="#services" className="hover:underline" onClick={() => setIsOpen(false)}>Услуги</a>
          <a href="#contact" className="hover:underline" onClick={() => setIsOpen(false)}>Контакты</a>
        </nav>
      )}
    </header>
  );
};



