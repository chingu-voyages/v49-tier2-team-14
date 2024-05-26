import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <div className='app'>
     <Header/>
      <div className='app-content'>
      <p>Whether you’re restyling your wardrobe or painting your apartment, GlowGuide’s AI technology acts as a smart assistant to give you complementary colors for any situation.</p>
       </div>
        <Footer />
        
    </div>
  )
}

export default App;
