const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// опис вимог до об'єктів, що приходять від користувача (зразок proptypes)
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().allow("").optional().email(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user", // з якої колекції записаний id
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// якщо при спробі збереження винекне помилка, тоді відпрацює мідлвар handleMongooseError
contactSchema.post("save", handleMongooseError);

// модель - клас який буде працювати з колекцією
// "contact" - mongoose сам переводе у множину, якщо немає такої бази, то сам її створить!!!
const Contact = model("contact", contactSchema);

module.exports = { Contact, addSchema, updateFavoriteSchema };
