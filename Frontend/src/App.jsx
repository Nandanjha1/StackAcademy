import React from 'react'
import Navbar from './components/Navbar'
import './index.css'
import Header from './Sections/Header';
import Footer from './Sections/Footer';

const App = () => {
  return (
    <div className="bg-primary text-foreground">
      <Navbar />
      <Header />
      <Footer />
    </div>

  );
}

export default App