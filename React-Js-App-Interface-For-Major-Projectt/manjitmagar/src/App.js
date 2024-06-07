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
          <div className='main'>
      <Hero />  
    </div>  
     <div className='my-content'>
     
      <main>
      
        <About />
        <Output />
        <Contact />
    
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
