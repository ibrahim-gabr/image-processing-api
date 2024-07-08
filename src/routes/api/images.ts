import express, { type RequestHandler } from 'express';
import { resizeImage } from '../../controllers/images';
import fs, { promises as fspromises } from 'fs';

const images = express.Router();

images.get('/', (async (req, res, next) => {
	try {
		const filename = req.query.filename as string;
		const width = req.query.width as unknown as number;
		const height = req.query.height as unknown as number;
		['width', 'height', 'filename'].forEach((key: string) => {
			if (!req.query[key] || req.query[key] === '') {
				res.status(400).send(`${key} is required`);
				next(new Error(`${key} is required`)); // Stop further execution
			}
		});
		const result = await resizeImage(filename, width, height);
		console.log({ result });
		res.type('jpeg').send(result);
	} catch (error) {
		next(error);
	}
}) as RequestHandler);

images.get('/list', async (req, res) => {
	const path = 'public/images/original';
	const files = await fspromises.readdir(path);
	console.log({ files });
	res.json(files);
});

export default images;
