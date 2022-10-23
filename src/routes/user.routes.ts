import { Router } from 'express';
import UsersController from '../controllers/user.controller';

const router = Router();

const controller = new UsersController();

router.post('/', controller.create);

export default router;
