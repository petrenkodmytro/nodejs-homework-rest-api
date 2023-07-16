const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt"); // хешування
const jwt = require("jsonwebtoken"); // створення токена
const gravatar = require("gravatar"); // створення аватарок
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { SECRET_KEY } = process.env;
// шлях до папки з аватаркими
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
  // перед реєстрацією користувача перевіряємо email на унікальність
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email alredy in use");
  }
  // хешуємо пароль
  const hasPassword = await bcrypt.hash(password, 10);
  // видаємо аватарку при реєстрації
  const avatarURL = gravatar.url(email);
  // зберігаємо в захешованому вигляді
  const newUser = await User.create({ ...req.body, password: hasPassword, avatarURL });

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
  // записуємо в базу token коли користувач логіниться
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name, subscription } = req.user;
  res.json({ email, name, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  // створюємо унікальне ім'я для аватарки
  const filename = `${_id}_${originalname}`;
  // шлях переміщення
  const resultUpload = path.join(avatarsDir, filename);
  // обробка аватарки 
  const avatar = await Jimp.read(tempUpload);
  avatar
    .resize(250, 250) // resize
    .quality(80) // set JPEG quality
    .write(tempUpload); // save

  // з тимчасового місця переміщуємо в папку avatars
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  // знаючи _id користувача перезапишемо аватарку
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
