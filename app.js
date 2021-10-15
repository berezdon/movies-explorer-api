const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { NODE_ENV, URL_MONGODB } = process.env;

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger); // подключаем логгер запросов
app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(require('./routes/index'));

app.listen(PORT, () => {
});
