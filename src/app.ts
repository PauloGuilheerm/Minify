import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import urlRoutes from './routes/routes';
import sequelize from './config/db';

const app = express();
app.use(bodyParser.json());

app.use('/', urlRoutes);

sequelize.sync();

const PORT = process.env.PORT;
app.listen(PORT)
