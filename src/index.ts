import express from 'express';
import { envs } from './core';
import routes from './routes';

const PORT = envs.PORT;
const app = express();

app.use(envs.API_PREFIX, routes);
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
	console.log('hello world');
});
