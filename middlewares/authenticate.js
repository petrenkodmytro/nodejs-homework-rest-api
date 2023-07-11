const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  // якщо не буде заголовка бекенд зламається, тому за замовчуванням пустий рядок
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" && token === undefined) {
    next(HttpError(401, "Not authorized. Not token"));
  }
  try {
    // перевіряємо чи створювався token нашим SECRET_KEY
    const { id } = await jwt.verify(token, SECRET_KEY);
    // перевіряємо чи є користувач в базі
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized. User not found"));
    }
    // до об'єкту req додаємо властивість user (хто робить запит)
    req.user = user;
    next(); // переходимо до запиту
  } catch {
    next(HttpError(401, "Not authorized. Catch error"));
  }
};

module.exports = authenticate;
