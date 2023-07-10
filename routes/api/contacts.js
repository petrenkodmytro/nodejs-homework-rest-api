const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");

// authenticate - переввіряє чи людина залогінена
router.get("/", authenticate, contactsController.getListContacts);

router.get("/:contactId", authenticate, isValidId, contactsController.getContactById);

router.post("/", authenticate, contactsController.addContact);

router.delete("/:contactId", authenticate, contactsController.removeContact);

router.put("/:contactId", authenticate, isValidId, contactsController.updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, contactsController.updateFavorite);

module.exports = router;
