import React from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = ({ items }) => {
  const { id } = useParams();
  const item = items.find(item => item.id === Number(id));

  if (!item) {
    return <div className="container"><h1>Объявление не найдено</h1></div>;
  }

  return (
    <div className="container">
      <h1>{item.title}</h1>
      {item.images && item.images.map((image, index) => (
        <img key={index} src={image} alt={`${item.title} ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
      ))}
      <p>{item.description}</p>
      <p>Цена: {item.price} руб.</p>
    </div>
  );
};

export default DetailPage;
