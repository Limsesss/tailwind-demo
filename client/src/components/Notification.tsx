import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Автоматическое скрытие через 3 секунды с анимацией
    const timeout = setTimeout(() => setVisible(false), 2700);
    // Закрываем окончательно через 3000 мс
    const hideTimeout = setTimeout(() => onClose(), 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(hideTimeout);
    };
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-5 right-5 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg flex items-center space-x-3
        transform transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      role="alert"
      aria-live="assertive"
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-green-200 focus:outline-none text-2xl font-bold leading-none"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};