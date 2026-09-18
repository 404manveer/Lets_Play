import express from 'express';
import {
  getAllUsers,
  getUserByEmail,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
} from './user.controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/email/:email', getUserByEmail);
router.get('/:id', getUserById);
router.post('/', registerUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
