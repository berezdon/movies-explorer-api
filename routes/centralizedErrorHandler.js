const router = require('express').Router();
const { errors } = require('celebrate');
const NotFoundError = require('../errors/notFoundError');
const { errorLogger } = require('../middlewares/logger');

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
router.use(errorLogger); // подключаем логгер ошибок
router.use(errors()); // обработчик ошибок celebrate
router.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

module.exports = router;
