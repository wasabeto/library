import { middleware as body } from 'bodymen';
import { Router } from 'express';
import { middleware as query } from 'querymen';
import { master, token } from '../../services/passport';
import { create, destroy, index, show, showMe } from './controller';
import { schema } from './model';

const router = new Router();
const { email, password, name, picture, role } = schema.tree;

router.get('/', token({ required: true }), query(), index);

router.get('/me', token({ required: true }), showMe);

router.get('/:id', show);

router.post('/', master(), body({ email, password, name, picture, role }), create);

router.delete('/:id', token({ required: true, roles: ['admin'] }), destroy);

export default router;
