const router = require('express').Router();

const {
  createUser,
  loginUser,
  logout,
  getUser,
  getAllUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser
} = require('../controller/userController');

const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/logout', logout);
router.get('/:id', authMiddleware, getUser);
router.get('/all-user', getAllUser);

router.delete('/:id', deleteUser);

router.put('/edit-user', authMiddleware, updatedUser);
router.put('/block/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock/:id', authMiddleware, isAdmin, unblockUser);

module.exports = router;