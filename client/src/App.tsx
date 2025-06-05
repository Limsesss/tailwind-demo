// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ContactForm } from './components/ContactForm';
import { ServicesPage } from './pages/ServicesPage';
import { ProfilePage } from './pages/ProfilePage'; 
import { ContactsPage } from './pages/ContactsPage';
import AdminInquiriesPage from './pages/AdminInquiriesPage';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section className="py-16">
                    <Hero />
                  </section>
                  <section id="contact" className="py-16">
                    <div className="container mx-auto px-4 max-w-lg">
                      <h2 className="text-3xl font-bold mb-8 text-center">Свяжитесь с нами</h2>
                      <ContactForm />
                    </div>
                  </section>
                </>
              }
            />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/admin/inquiries" element={<AdminInquiriesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};


export default App;
