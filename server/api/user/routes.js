import express from 'express';
import {authorized} from '../auth/controllers/authController';
import {updateProfile} from './controllers/userController';

const router = express.Router();
router.put('/profile', authorized, updateProfile);
export default router;