import express from 'express';
import { register } from '../controllers/Authentication';

const router = express.Router();

router.post('/register', register);

export default router;
