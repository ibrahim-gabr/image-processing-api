import request from 'supertest';
import app from '../index';
import { HttpCode } from '../core';
import { resizeImage } from '../controllers/images';

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

	it('returns if filename is not available in images list', async () => {
		const res = await request(app).get('/api/v1/images?filename=2.jpg&width=100&height=100');
		const status = res.status;
		expect(status).toEqual(HttpCode.NOT_FOUND);
	});

	it('returns buffer if query params are provided', async () => {
		const res = await request(app).get('/api/v1/images?filename=encenadaport&width=100&height=100');
		expect(res.body).toBeInstanceOf(Buffer);
	});

	it('image processing works fine and there is no errors', async () => {
		const testWidth = 100;
		const testHeight = 100;
		expect(async () => {
			await resizeImage('encenadaport', testWidth, testHeight);
		}).not.toThrow();
	});
});
