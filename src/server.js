const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Настройка multer для хранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Путь к файлу JSON для хранения объявлений
const adsFilePath = path.join(__dirname, 'ads.json');

// Чтение объявлений из файла
const readAdsFromFile = () => {
  if (fs.existsSync(adsFilePath)) {
    const data = fs.readFileSync(adsFilePath);
    return JSON.parse(data);
  }
  return [];
};

// Запись объявлений в файл
const writeAdsToFile = (ads) => {
  fs.writeFileSync(adsFilePath, JSON.stringify(ads, null, 2));
};

// Маршрут для загрузки файлов и сохранения объявления
app.post('/upload', upload.array('images', 10), (req, res) => {
  try {
    const files = req.files;
    if (!files) {
      console.error('Файлы не были загружены.');
      return res.status(400).send('Файлы не были загружены.');
    }

    const urls = files.map(file => `http://localhost:${port}/uploads/${file.filename}`);
    const { title, description, price, category } = req.body;

    const ads = readAdsFromFile();
    const newAd = {
      id: Date.now(),
      title,
      description,
      price: Number(price),
      category,
      images: urls
    };

    ads.push(newAd);
    writeAdsToFile(ads);

    res.status(200).json({ urls, newAd });
  } catch (error) {
    console.error('Ошибка при сохранении объявления:', error);
    res.status(500).send('Что-то пошло не так!');
  }
});

// Маршрут для получения всех объявлений
app.get('/ads', (req, res) => {
  try {
    const ads = readAdsFromFile();
    res.status(200).json(ads);
  } catch (error) {
    console.error('Ошибка при получении объявлений:', error);
    res.status(500).send('Что-то пошло не так!');
  }
});

// Обработка остальных ошибок
app.use((err, req, res, next) => {
  console.error('Произошла ошибка:', err.stack);
  res.status(500).send('Что-то пошло не так!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
