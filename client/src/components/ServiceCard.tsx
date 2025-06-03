import React, { useState } from 'react';

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

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 text-center space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{shortDescription}</p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Подробнее
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{fullDescription}</p>
          </div>
        </div>
      )}
    </>
  );
};


export default ServiceCard;