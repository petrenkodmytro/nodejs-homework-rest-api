// middleware - проміжні функції обробники
const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const authenticate = require("./authenticate");

module.exports = { isValidId, validateBody, authenticate };
