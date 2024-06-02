import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import DetailPage from './pages/DetailPage';
import ContactPage from './pages/ContactPage';
import AddListingPage from './pages/AddListingPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Загружаем объявления с сервера при монтировании компонента
    const fetchAds = async () => {
      try {
        const response = await fetch('http://localhost:3001/ads');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Ошибка при загрузке объявлений:', error);
      }
    };

    fetchAds();
  }, []);

  const handleAddListing = (newListing) => {
    setItems([...items, newListing]);
  };

  return (
    <Router>
      <div id="root">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage items={items} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage items={items} />} />
            <Route path="/detail/:id" element={<DetailPage items={items} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/add-listing" element={<AddListingPage onAddListing={handleAddListing} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
