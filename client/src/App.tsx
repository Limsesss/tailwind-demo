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

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Анимированный градиентный фон */}
          <div
            className="absolute inset-0 -z-10 animate-gradient-x bg-gradient-to-r from-violet-100 via-violet-300 to-violet-100 bg-[length:200%_200%] opacity-60"
          />

          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
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
