const router = require('express').Router();

const { createUser } = require('../controller/userController');

router.post('/register', createUser);

module.exports = router;