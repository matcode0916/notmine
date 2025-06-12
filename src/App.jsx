import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import News from '@/pages/News';
import Forum from '@/pages/Forum';
import NewsDetail from '@/pages/NewsDetail';
import ForumTopic from '@/pages/ForumTopic';
import AboutUs from '@/pages/AboutUs'; 
import Events from '@/pages/Events';
import PremiumPlans from '@/pages/PremiumPlans';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ForgotPassword from '@/pages/ForgotPassword';
import UpdatePassword from '@/pages/UpdatePassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/noticias/:id" element={<NewsDetail />} />
              <Route path="/foro" element={<Forum />} />
              <Route path="/foro/:id" element={<ForumTopic />} />
              <Route path="/acerca-de-nosotros" element={<AboutUs />} />
              <Route path="/proximos-eventos" element={<Events />} />
              <Route path="/planes-premium" element={<ProtectedRoute><PremiumPlans /></ProtectedRoute>} />
              <Route path="/ajustes" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/ajustes/:tab" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;