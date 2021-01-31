const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');

const mongoConnect = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => {
      console.info(`MongoDB connected on ${process.env.DB_CONNECT}`);
      mongoose.plugin(slug);
    })
    .catch((err) => {
      console.info(err);
    });
};

module.exports = mongoConnect;