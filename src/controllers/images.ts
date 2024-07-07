import fs, { promises as fsPromises } from 'fs';
import sharp from 'sharp';
import path from 'node:path';

export const resizeImage = async (filename: string, width: number, height: number): Promise<Buffer> => {
	const fileUrl = path.resolve(`public/images/thumbs/${filename}_${width}_${height}.jpg`);
	const srcUrl = path.resolve(`public/images/${filename}.jpg`);
	console.log(fileUrl);
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
