import express from 'express';
import { envs } from './core';
import routes from './routes';
import bodyParser from 'body-parser';

const PORT = envs.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(envs.API_PREFIX, routes);

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.get('/', (req, res) => {
	res.render('pages/home');
});

app.use(express.static('public'));
app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});

export default app;
