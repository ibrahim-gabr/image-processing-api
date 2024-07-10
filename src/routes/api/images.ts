import express, { type RequestHandler } from 'express';
import { listImages, resizeImage } from '../../controllers/images';
import { promises as fspromises } from 'fs';
import { HttpCode, ZERO } from '../../core';

const images = express.Router();

images.get('/', (async (req: express.Request, res: express.Response, next) => {
	try {
		const filename = req.query.filename as string;
		const width = Number(req.query.width);
		const height = Number(req.query.height);
		['width', 'height', 'filename'].forEach((key: string) => {
			if (!req.query[key] || req.query[key] === '') {
				res.status(HttpCode.BAD_REQUEST).send(`${key} is required`);
				next(new Error(`${key} is required`)); // Stop further execution
			}
		});
		// if height or width is not a number and not a positive integer
		if (!Number.isInteger(width) || !Number.isInteger(height) || width <= ZERO || height <= ZERO) {
			res.status(HttpCode.BAD_REQUEST).send('width and height must be positive integers');
			next(new Error('width and height must be positive integers')); // Stop further
		}
		const originalFiles = await listImages();
		if (!originalFiles.includes(filename)) {
			res.status(HttpCode.NOT_FOUND).send('file not found');
			next(new Error('file not found')); // Stop
		}
		const result = await resizeImage(filename, width, height);
		res.type('jpeg').send(result);
	} catch (error) {
		next(error);
	}
}) as RequestHandler);

images.get('/list', (async (req: express.Request, res: express.Response) => {
	const path = 'public/images/original';
	const files = await fspromises.readdir(path);
	res.json(files);
}) as RequestHandler);

export default images;
