import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Создайте этот файл для стилей, если его еще нет

const Header = () => (
  <header>
    <nav>
      <div className="logo">
        <Link to="/">OLX</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/about">О нас</Link></li>
        <li><Link to="/gallery">Галерея</Link></li>
        <li><Link to="/contact">Контакты</Link></li>
        <li><Link to="/add-listing" className="add-listing-button">Подать объявление</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
