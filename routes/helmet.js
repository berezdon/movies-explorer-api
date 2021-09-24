const router = require('express').Router();
const helmet = require('helmet');

router.use(helmet.hidePoweredBy());
router.use(helmet.frameguard({ action: 'sameorigin' }));
router.use(helmet.xssFilter());
router.use(helmet.noSniff());

module.exports = router;
