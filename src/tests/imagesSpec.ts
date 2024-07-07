import request from 'supertest';
import app from '../index';
import { HttpCode } from '../core';

describe('images processing endpoint', () => {
	it('does not get 404', async () => {
		const res = await request(app).get('/api/v1/images');
		const status = res.statusCode;
		expect(status).not.toEqual(HttpCode.NOT_FOUND);
	});
});
