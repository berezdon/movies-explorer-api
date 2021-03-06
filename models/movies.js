const mongoose = require('mongoose');

const regExpLink = /^((http|https):\/\/)(www\.)?[A-Za-z0-9][\w\-.~:/?#[\]@!$&'()*+,;=]*\.[A-Za-z0-9-]{2,8}([\w\-.~:/?#[\]@!$&'()*+,;=]*)?#?/;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        regExpLink.test(v);
      },
      message: 'Неверный формат ссылки на постер к фильму',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        regExpLink.test(v);
      },
      message: 'Неверный формат ссылки на картинку',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        regExpLink.test(v);
      },
      message: 'Неверный формат ссылки на картинку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
