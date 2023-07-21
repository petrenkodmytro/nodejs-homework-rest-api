// додаємо групу маршрутів для авторизації
const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const authController = require("../../controllers/auth");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), authController.register);

// verify email
router.get("/verify/:verificationToken", authController.verifyEmail);

// якщо при реєстрації не надійшов лист для верефікації
router.post("/verify", validateBody(schemas.verifySchema), authController.resendVerifyEmail);

// signin
router.post("/login", validateBody(schemas.loginSchema), authController.login);

// current user
router.get("/current", authenticate, authController.getCurrent);

// logout
router.post("/logout", authenticate, authController.logout);

// update subscription
router.patch("/users", authenticate, validateBody(schemas.updateSubscriptionSchema), authController.updateSubscription);

// update avatar
router.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);

module.exports = router;
