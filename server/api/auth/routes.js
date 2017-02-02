import express from 'express';
import * as authController from './controllers/authController';

var router = express.Router();

router.use('/login', authController.login);
router.use('/logout', authController.logout);
router.use('/register', authController.register);
router.use('/info', authController.info);

export default router;