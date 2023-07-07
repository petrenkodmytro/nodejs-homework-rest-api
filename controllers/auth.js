const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  // перед реєстрацією користувача перевіряємо email на унікальність
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email alredy in use");
  }
  // хешуємо пароль
  const hasPassword = await bcrypt.hash(password, 10);
  // зберігаємо в захешованому вигляді
  const newUser = await User.create({ ...req.body, password: hasPassword });

  res.status(201).json({
    emai: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  // якщо не знайшли користувача за email
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  // перевірка пароля
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  // створення token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "20h" });
  res.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
