import React, { useState } from 'react';
import './AddListingPage.css';

const categories = [
  'Электроника',
  'Автомобили',
  'Недвижимость',
  'Услуги'
];

const AddListingPage = ({ onAddListing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
  
    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (data.newAd && data.newAd.id) {
        const newListing = {
          id: data.newAd.id,
          title: data.newAd.title,
          description: data.newAd.description,
          price: data.newAd.price,
          category: data.newAd.category,
          images: data.newAd.images,
        };
  
        onAddListing(newListing);
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory(categories[0]);
        setImages([]);
        alert('Объявление добавлено!');
      } else {
        console.error('Ошибка при получении ID нового объявления.');
        alert('Ошибка при добавлении объявления. ID не был получен.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert(`Ошибка при добавлении объявления. Пожалуйста, попробуйте снова. ${error.message}`);
    }
  };
  

  return (
    <div className="container add-listing-page">
      <h1>Добавить объявление</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Цена:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Категория:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Фотографии:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Добавить</button>
      </form>
    </div>
  );
};

export default AddListingPage;
