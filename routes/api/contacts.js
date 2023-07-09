const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");

// authenticate - переввіряє чи людина залогінена
router.get("/", authenticate, ctrl.getListContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.put("/:contactId", authenticate, isValidId, ctrl.updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, ctrl.updateFavorite);

module.exports = router;
