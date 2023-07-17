// Multer — це проміжне ПЗ (middleware) фреймворка Express, яка використовується при завантаженні файлів для обробки multipart/form-data
const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

// об'єкт налаштуваннь
const multerConfig = multer.diskStorage({
  // шлях до тимчасової папки
  destination: tempDir,
  filename: (req, file, cb) => {
  // вказуємо під яким ім'ям зберегти файл
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
