import request from 'supertest';
import app from '../index';
import { HttpCode } from '../core';

describe('images processing endpoint', () => {
	it('does not get 404', async () => {
		const res = await request(app).get('/api/v1/images');
		const status = res.status;
		expect(status).not.toEqual(HttpCode.NOT_FOUND);
	});
	it('returns 400 if no query params', async () => {
		const res = await request(app).get('/api/v1/images');
		const status = res.status;
		expect(status).toEqual(HttpCode.BAD_REQUEST);
	});
	it('returns if filename is not availble in images list', async () => {
		const res = await request(app).get('/api/v1/images?filename=2.jpg&width=100&height=100');
		const status = res.status;
		expect(status).toEqual(HttpCode.INTERNAL_SERVER_ERROR);
	});
	it('returns buffer if query params are provided', async () => {
		const res = await request(app).get('/api/v1/images?filename=encenadaport&width=100&height=100');
		expect(res.body).toBeInstanceOf(Buffer);
	});
});
