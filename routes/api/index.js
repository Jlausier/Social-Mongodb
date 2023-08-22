const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoute');
const usersRoutes = require('./usersRoutes');

router.use('/users', thoughtsRoutes);
router.use('/thoughts', usersRoutes);

module.exports = router;
