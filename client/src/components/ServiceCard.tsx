import React, { useState, useEffect } from 'react';

interface ServiceCardProps {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  description: string;
  price: number;
  onAddToCart?: () => void; // ⬅️ новый проп
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  shortDescription,
  fullDescription,
  image,
  price,
  onAddToCart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'auto';
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4 flex flex-col hover:shadow-lg transition duration-300">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="text-xl font-semibold text-violet-700">{title}</h3>
        <p className="text-gray-600 flex-grow">{shortDescription}</p>
        <p className="text-lg font-bold text-violet-800">{price} ₽</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
          >
            Подробнее
          </button>
          <button
            onClick={onAddToCart} // ⬅️ делегируем действие родителю
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            В корзину
          </button>
        </div>
      </div>

      {isVisible && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl max-w-md w-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
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
