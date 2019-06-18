import { Router } from 'express';
import { Login } from './AuthControllers';

const router = Router();

router.post('/login', Login);

export default router;
