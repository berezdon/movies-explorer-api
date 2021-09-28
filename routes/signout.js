const router = require('express').Router();
const { exit } = require('../controllers/user');

router.get('/signout', exit);

module.exports = router;
