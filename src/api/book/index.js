import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import { create, index, show, update, destroy } from './controller';
import { schema } from './model';

const router = new Router();
const { title, genre, author, published } = schema.tree;

/**
 * Create a book
 */
router.post('/', token({ required: true }), body({ title, genre, author, published }), create);

/**
 * Retrieve all books
 */
router.get('/', query(), index);

/**
 * Get a book
 */
router.get('/:id', show);

/**
 * Update a book
 */
router.put('/:id', token({ required: true }), body({ title, genre, author, published }), update);

/**
 * Delete a book
 */
router.delete('/:id', token({ required: true }), destroy);

export default router;
