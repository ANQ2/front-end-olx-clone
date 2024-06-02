// src/pages/GalleryPage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

const GalleryPage = ({ items }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = category ? item.category === category : true;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      <h1>Галерея</h1>
      {category && <h2>Категория: {category}</h2>}
      
      <section className="search">
        <h2>Поиск по объявлениям</h2>
        <input
          type="text"
          placeholder="Поиск объявлений..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </section>

      <div className="gallery">
        {filteredItems.map(item => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
