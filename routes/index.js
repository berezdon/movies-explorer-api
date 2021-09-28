const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use(require('./rateLimit'));
router.use(require('./helmet'));
router.use(require('./signin'));
router.use(require('./signup'));
router.use(require('./signout'));

router.use(auth);
router.use(require('./user'));
router.use(require('./movie'));
router.use(require('./centralizedErrorHandler'));

module.exports = router;
