const router = require('express').Router();
const rateLimit = require('express-rate-limit');

router.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour duration in milliseconds
    max: 100,
    message: 'You exceeded 100 requests in 1 hour limit!',
    headers: true,
  }),
);

module.exports = router;
