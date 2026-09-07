import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import StudentDashboard from './components/StudentDashboard';
import LoginScreen from './components/LoginScreen';
import { auth } from './firebase';
import Header from './components/Header';
import Hero from './components/Hero';
import Authority from './components/Authority';
import Features from './components/Features';
import Process from './components/Process';
import Audience from './components/Audience';
import Footer from './components/Footer';
import StickyWhatsApp from './components/StickyWhatsApp';

function App() {
  const isProfessorPage = window.location.pathname.startsWith('/professor');
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isProfessorPage) {
      setIsCheckingAuth(false);
      return;
    }
    if (!auth) {
      setIsCheckingAuth(false);
      return;
    }
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsCheckingAuth(false);
    });
  }, [isProfessorPage]);

  if (!isProfessorPage) {
    return (
      <div className="font-sans antialiased text-brand-dark bg-white selection:bg-brand-red selection:text-white">
        <Header />
        <main>
          <Hero />
          <Authority />
          <Features />
          <Process />
          <Audience />
        </main>
        <Footer />
        <StickyWhatsApp />
      </div>
    );
  }

  if (isCheckingAuth) {
    return <div className="flex min-h-screen items-center justify-center bg-brand-dark text-sm font-semibold text-white">Verificando acesso...</div>;
  }

  if (!user) return <LoginScreen />;

  return (
    <div className="font-sans antialiased selection:bg-brand-red selection:text-white">
      <StudentDashboard userId={user.uid} onLogout={() => auth && signOut(auth)} />
    </div>
  );
}

export default App;