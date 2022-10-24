import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { classeValidate, usernameValidate,
  levelValidate, passwordValidate } from '../middlewares/user.middleware';

const router = Router();

const controller = new UserController();

router
  .post('/', usernameValidate, classeValidate, levelValidate, passwordValidate, controller.create);

export default router;
