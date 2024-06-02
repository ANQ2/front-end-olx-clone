// src/components/ItemCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ id, title, price, images }) => {
  return (
    <div className="item-card">
      <Link to={`/detail/${id}`}>
        {images && images.length > 0 && (
          <img src={images[0]} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
        )}
        <h2>{title}</h2>
        <p>Цена: {price} руб.</p>
      </Link>
    </div>
  );
};

export default ItemCard;
