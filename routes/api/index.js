const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoute');
const usersRoutes = require('./usersRoutes');

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;
