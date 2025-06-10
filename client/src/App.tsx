import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServicesPage } from './pages/ServicesPage';
import { ProfilePage } from './pages/ProfilePage'; 
import { ContactsPage } from './pages/ContactsPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';
import { CartProvider } from './components/CartContext';
import Home from './pages/Home'; // ✅ Добавляем импорт
import BackgroundWaves from './components/BackgroundWaves';
import AuthForm from './components/AuthForm';

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) setUserId(Number(storedUserId));
  }, []);

  const handleLoginSuccess = (id: number) => {
    localStorage.setItem('userId', id.toString());
    setUserId(id);
  };

  if (!userId) {
    return <AuthForm onLoginSuccess={handleLoginSuccess} />;
  }
  return (
    <Router>
      <CartProvider userId={userId}>
        <div className="min-h-screen flex flex-col relative">
           <BackgroundWaves /> {/* 🌊 Анимированный фон */}
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} /> {/* ✅ Здесь теперь Home */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/profile/*" element={<ProfilePage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
