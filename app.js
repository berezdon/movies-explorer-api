const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { limiter } = require('./routes/rateLimit');
const { helmet } = require('./routes/helmet');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors);
app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(require('./routes/centralizedErrorHandler'));

app.listen(PORT);
