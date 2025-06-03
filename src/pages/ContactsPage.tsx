import React from 'react';

export const ContactsPage: React.FC = () => {
  return (
    <div className="py-16 px-4 container mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Контакты</h1>
      
      <div className="space-y-4 text-lg">
        <p><strong>Адрес:</strong> г. Псков, ул. Ремонтная, д. 15</p>
        <p><strong>Телефон:</strong> <a href="tel:+78123456789" className="text-blue-500 hover:underline">+7 (812) 345-67-89</a></p>
        <p><strong>Email:</strong> <a href="mailto:support@remont-pc.ru" className="text-blue-500 hover:underline">support@remont-pc.ru</a></p>
      </div>
    </div>
  );
};
