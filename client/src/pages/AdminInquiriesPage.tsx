import React, { useEffect, useState } from 'react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const AdminInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await fetch('/api/inquiries');
        const data = await res.json();
        setInquiries(data);
      } catch (error) {
        console.error('Ошибка загрузки заявок:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Заявки пользователей</h1>

      {loading ? (
        <p>Загрузка...</p>
      ) : inquiries.length === 0 ? (
        <p>Заявок пока нет.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-4 bg-white rounded-lg shadow">
              <p><strong>Имя:</strong> {inq.name}</p>
              <p><strong>Email:</strong> {inq.email}</p>
              <p><strong>Сообщение:</strong> {inq.message}</p>
              <p className="text-sm text-gray-500">
                Отправлено: {new Date(inq.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInquiriesPage;
