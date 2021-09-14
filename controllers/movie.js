const Movie = require('../models/movies');
const NotFoundError = require('../errors/notFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.send(cards).json())
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((card) => res.send(card).json())
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Нет фильма по заданному id');
    })
    .then((movie) => {
      if (movie.owner.equals(req.user._id)) {
        Movie.deleteOne(movie)
          .then((dataMovie) => res.send(dataMovie).json())
          .catch(next);
      } else {
        const err = new Error('вы не можете удалить этот фильм, недостаточно прав');
        err.statusCode = 403;
        next(err);
      }
    })
    .catch(next);
};
