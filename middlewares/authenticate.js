const {User }= require("../models/user")
const authenticate = (req, res, next)=>{

}




// const { User } = require("../models/user");
// const { HttpError } = require("../helpers");
// const jwt = require("jsonwebtoken");

// const { SECRET_KEY } = process.env;

// const authenticate = async (req, res, next) => {
//   // якщо не буде заголовка бекенд зламається, тому за замовчуванням пустий рядок
//   const { authorization = "" } = req.headers;
//   const [bearer, token] = authorization.split(" ");
//   if (bearer !== "Bearer") {
//     next(HttpError(401, "Not authorized"));
//   }
//   try {
//     // перевіряємо чи створювався token нашим SECRET_KEY
//     const { id } = await jwt.verify(token, SECRET_KEY);
//     // перевіряємо чи є користувач в базі
//     const user = await User.findById(id)
//     if (!user) {
//       next(HttpError(401, "Not authorized"));
//     }
//     next(); // переходимо до запиту
//   } catch {
//     next(HttpError(401, "Not authorized"));
//   }
// };

module.exports = authenticate;
