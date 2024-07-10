import fs, { promises as fspromises, promises as fsPromises } from 'fs';
import sharp from 'sharp';
import path from 'node:path';
import { ZERO } from '../core';

export const resizeImage = async (filename: string, width: number, height: number): Promise<Buffer> => {
	const fileUrl = path.resolve(`public/images/thumbs/${filename}_${width}_${height}.jpg`);
	const srcUrl = path.resolve(`public/images/original/${filename}.jpg`);
	if (fs.existsSync(fileUrl)) {
		return await fsPromises.readFile(fileUrl);
	}
	try {
		const data = await sharp(srcUrl).resize(Number(width), Number(height)).jpeg({ mozjpeg: true }).toBuffer();
		await fsPromises.writeFile(fileUrl, data);
		return data;
	} catch (err) {
		console.log(err);
		throw new Error('Failed to process image');
	}
};

export const listImages = async (): Promise<string[]> => {
	const path = 'public/images/original';
	return (await fspromises.readdir(path)).map((file) => file.split('.')[ZERO]);
};
