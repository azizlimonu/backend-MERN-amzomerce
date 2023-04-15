const router = require('express').Router();

const {
  createUser,
  loginUser,
  logout,
  getUser,
  getAllUser
} = require('../controller/userController');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/:id', getUser);
router.get('/all-user', getAllUser);

module.exports = router;