import request from 'supertest';
import routes from '.';
import { apiRoot } from '../../config';
import express from '../../services/express';
import { signSync } from '../../services/jwt';
import User from '../user/model';
import Book from './model';

const app = () => express(apiRoot, routes);

let userSession, book1, book2;

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' });
  userSession = signSync(user.id);
  book1 = await Book.create({
    title: 'Book 1',
    genre: 'Genre 1',
    author: { name: 'Author 2', age: 50, books: 5 },
    published: 2015,
  });
  book2 = await Book.create({
    title: 'Book 2',
    genre: 'Genre 2',
    author: { name: 'Author 2', age: 30, books: 3 },
    published: 2017,
  });
});

test('POST /books 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: userSession,
      title: 'Book 1',
      genre: 'Genre 1',
      author: { name: 'Authr1', age: 50, books: 5 },
      published: 2015,
    });
  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.title).toEqual('Book 1');
  expect(body.genre).toEqual('Genre 1');
  expect(body.author).toEqual({ name: 'Authr1', age: 50, books: 5 });
  expect(body.published).toEqual(2015);
});

test('POST /books 401', async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /books 200', async () => {
  const { status, body } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(Number.isNaN(body.count)).toBe(false);
});

test('GET /books?q=1 200', async () => {
  const { status, body } = await request(app()).get(apiRoot).query({ q: '1' });
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(body.rows.length).toEqual(1);
  expect(Number.isNaN(body.count)).toBe(false);
});

test('GET /books/:id 200', async () => {
  const { status, body } = await request(app()).get(`${apiRoot}/${book1.id}`);
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(book1.id);
});

test('GET /books/:id 404', async () => {
  const { status } = await request(app()).get(apiRoot + '/123456789098765432123456');
  expect(status).toBe(404);
});

test('PUT /books/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${book1.id}`)
    .send({
      access_token: userSession,
      title: 'Book 1',
      genre: 'Genre 1',
      author: { name: 'Authr1', age: 50, books: 5 },
      published: 2015,
    });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(book1.id);
  expect(body.title).toEqual('Book 1');
  expect(body.genre).toEqual('Genre 1');
  expect(body.author).toEqual({ name: 'Authr1', age: 50, books: 5 });
  expect(body.published).toEqual(2015);
});

test('PUT /books/:id 401', async () => {
  const { status } = await request(app()).put(`${apiRoot}/${book1.id}`);
  expect(status).toBe(401);
});

test('PUT /books/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({
      access_token: userSession,
      title: 'Book 1',
      genre: 'Genre 1',
      author: { name: 'Authr1', age: 50, books: 5 },
      published: 2015,
    });
  expect(status).toBe(404);
});

test('DELETE /books/:id 204 (user)', async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${book1.id}`).query({ access_token: userSession });
  expect(status).toBe(204);
});

test('DELETE /books/:id 401', async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${book1.id}`);
  expect(status).toBe(401);
});

test('DELETE /books/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession });
  expect(status).toBe(404);
});
