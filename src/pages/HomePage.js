// src/pages/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

const HomePage = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Добро пожаловать на OLX Клон</h1>
      <p>Ваше универсальное место для покупки и продажи товаров.</p>

      <div className="banner">
        <img src="https://via.placeholder.com/800x300" alt="Баннер" />
      </div>

      <section className="search">
        <h2>Поиск по сайту</h2>
        <input
          type="text"
          placeholder="Поиск объявлений..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </section>

      <section className="categories">
        <h2>Категории товаров</h2>
        <div className="category-list">
          <Link to="/gallery?category=Электроника">Электроника</Link>
          <Link to="/gallery?category=Автомобили">Автомобили</Link>
          <Link to="/gallery?category=Недвижимость">Недвижимость</Link>
          <Link to="/gallery?category=Услуги">Услуги</Link>
        </div>
      </section>

      <section className="popular-items">
        <h2>Популярные объявления</h2>
        <div className="gallery">
          {filteredItems.slice(0, 3).map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </section>

      <section className="cta-buttons">
        <Link to="/add-listing"><button>Добавить объявление</button></Link>
        <Link to="/gallery"><button>Посмотреть галерею</button></Link>
      </section>
    </div>
  );
};

export default HomePage;
