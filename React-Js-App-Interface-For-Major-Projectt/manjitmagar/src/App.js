import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Output from './components/Output';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './style.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Output />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
