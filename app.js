import express from 'express';
import path from 'path';
import { createUserApi } from './controller.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/createUser', createUserApi);

app.use(express.static(path.join(process.cwd(), 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});