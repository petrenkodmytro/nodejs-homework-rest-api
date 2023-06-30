const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");
// пакет для process.env шукає файл env і додає змінні оточення
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// логування (запис) історії запитів
app.use(logger(formatsLogger));

// дозволяємо кросдоменні запити
app.use(cors());

// мідлвара - парсер JSON данних у тілі запиту
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// помилки 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обробник помилок сервера 500 - функція, яка має 4 параметра
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
