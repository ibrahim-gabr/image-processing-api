import express from 'express';

const posts = express.Router();
posts.get('/', (req, res) => {
	res.send('Posts route');
});

export default posts;
