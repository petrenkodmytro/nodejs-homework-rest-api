// mongoose - підключення до бази данних
const mongoose = require("mongoose");
const DB_HOST = "mongodb+srv://DmytroPetrenko:Dima0802@cluster0.zxfdxim.mongodb.net/PhoneBook?retryWrites=true&w=majority";

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });



// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
