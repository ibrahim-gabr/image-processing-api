import express from 'express';
import posts from './api/posts';

const routes = express.Router();

routes.get('/', (req, res) => {
	res.send('main route');
});

routes.use('/posts', posts);
export default routes;
