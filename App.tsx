import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Authority from './components/Authority';
import Features from './components/Features';
import Process from './components/Process';
import Audience from './components/Audience';
import Footer from './components/Footer';

function App() {
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
    </div>
  );
}

export default App;