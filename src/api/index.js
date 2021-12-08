import { Router } from 'express';
import user from './user';
import auth from './auth';
import book from './book'

const router = new Router();

router.use('/users', user);
router.use('/auth', auth);
router.use('/books', book)

export default router;
