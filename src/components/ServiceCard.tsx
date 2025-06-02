import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => (
  <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ServiceCard;