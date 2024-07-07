import express, { type RequestHandler } from 'express';
import { resizeImage } from '../../controllers/images';

const images = express.Router();

images.get('/', (async (req, res) => {
	const filename = req.query.filename as string;
	const width = req.query.width as unknown as number;
	const height = req.query.height as unknown as number;
	['width', 'height', 'filename'].forEach((key: string) => {
		if (!req.query[key] || req.query[key] === '') {
			throw new Error(`${key} is required`);
		}
	});
	const result = await resizeImage(filename, width, height);
	console.log({ result });
	res.type('jpeg').send(result);
}) as RequestHandler);

export default images;
