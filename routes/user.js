const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserId, patchUser, patchUserAvatar, getUserMe,
} = require('../controllers/user');

const regExpLink = /^((http|https):\/\/)(www\.)?[A-Za-z0-9][\w\-.~:/?#[\]@!$&'()*+,;=]*\.[A-Za-z0-9-]{2,8}([\w\-.~:/?#[\]@!$&'()*+,;=]*)?#?/;

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUserId);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExpLink),
  }),
}), patchUserAvatar);

module.exports = router;
