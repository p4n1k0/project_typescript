import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const controller = new UserController();

router.post('/login', controller.login);

export default router;
