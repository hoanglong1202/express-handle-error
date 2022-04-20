require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const userRoute = require('./router/user.router');
const logEvents = require('./helpers/logEvents');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan('common'));
app.use('/v1', userRoute);

app.use((req, res, next) => {
  next(createError(400, 'API not found'));
});

app.use((err, req, res, next) => {
  const msg = `${req.url}---${req.method}---${err.status}---${err.message}`;
  logEvents(msg);

  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
    link: {
      docs: 'https://docs.com',
    },
  });
});

mongoose.connect('mongodb://127.0.0.1:27017/users');

mongoose.connection.on('connected', () =>
  console.log('Mongo connected successfully')
);

mongoose.connection.on('error', (err) =>
  console.log(`Mongo connect failed with error ${err.message}`)
);

mongoose.connection.on('disconnected', () =>
  console.log('Mongo disconnected successfully')
);

process.on('SIGINT', async () => {
  mongoose.connection.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`The server is now on port ${PORT}`);
});
