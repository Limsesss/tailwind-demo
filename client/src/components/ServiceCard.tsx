import React, { useState, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  description: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  shortDescription,
  fullDescription,
  description,
  image,
}) => {
 const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Управление анимацией появления/исчезновения модалки
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // запрет скролла под модалкой
    } else {
      // задержка для анимации закрытия
      const timeout = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'auto'; // разрешаем скролл
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4 flex flex-col">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="text-xl font-semibold text-violet-700">{title}</h3>
        <p className="text-gray-600 flex-grow">{shortDescription}</p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          Подробнее
        </button>
      </div>

      {isVisible && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)} // закрываем при клике вне модалки
        >
          <div
            className="bg-white p-6 rounded-2xl max-w-md w-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике по модалке
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-3xl font-bold focus:outline-none"
              aria-label="Закрыть подробности"
            >
              &times;
            </button>
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-4 text-violet-800">{title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{fullDescription}</p>
          </div>
        </div>
      )}
    </>
  );
};



export default ServiceCard;