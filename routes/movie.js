const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovie, deleteMovie,
} = require('../controllers/movie');

const regExpLink = /^((http|https):\/\/)(www\.)?[A-Za-z0-9][\w\-.~:/?#[\]@!$&'()*+,;=]*\.[A-Za-z0-9-]{2,8}([\w\-.~:/?#[\]@!$&'()*+,;=]*)?#?/;

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpLink),
    trailer: Joi.string().required().pattern(regExpLink),
    thumbnail: Joi.string().required().pattern(regExpLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
