import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServicesPage } from './pages/ServicesPage';
import { ProfilePage } from './pages/ProfilePage'; 
import { ContactsPage } from './pages/ContactsPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';
import { CartProvider } from './components/CartContext';
import Home from './pages/Home'; // ✅ Добавляем импорт
import BackgroundWaves from 'components/BackgroundWaves';

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
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
