const router = require('express').Router();
const auth = require('../middlewares/auth');
router.use(require('./signin'));
router.use(require('./signup'));
router.use(require('./signout'));

router.use(auth);
router.use(require('./user'));
router.use(require('./movie'));

module.exports = router;
