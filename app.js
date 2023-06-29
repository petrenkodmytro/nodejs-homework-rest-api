const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config(); // пакет для process.env шукає файл env і додає змінні оточення
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// логування (запис) исторії запитів
app.use(logger(formatsLogger));
app.use(cors());

// мідлвара перевіряє формат данних у тілі запиту
app.use(express.json());

// всі запити що починаються з /api/contacts треба шукати в contactsRouter
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// обробник помилок - функція, яка має 4 параметра
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
