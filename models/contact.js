const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// опис вимог до об'єктів, що приходять від користувача (зразок proptypes)
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

// опис вимог до об'єктів, що зберігається у базі
// схема частина моделі і її перевірки уникнути не можна
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// до схеми додаємо мідлвар присвоєння 400 статусу
contactSchema.post("save", handleMongooseError);

// модель - клас який буде працювати з колекцією
// "contact" - mongoose сам переводе у множину, якщо немає такої бази, то сам її створить!!!
const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema };
