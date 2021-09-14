const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  patchUser, getUserMe,
} = require('../controllers/user');

router.get('/me', getUserMe);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), patchUser);

module.exports = router;
