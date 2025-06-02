import React from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="font-bold hover:text-green-300"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};
