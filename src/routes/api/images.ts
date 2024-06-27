import express from 'express';

const images = express.Router();
images.get('/', (req, res) => {
	res.status(200).send('images routes');
});

export default images;
