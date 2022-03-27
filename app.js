const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const APP_PORT = 8080;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/dependencias', require('./routes/dependencias'));
app.use('/api/representantes', require('./routes/representantes'));

const server = app.listen(APP_PORT, () => {
  process.stdout.write(`app started on port ${APP_PORT}\n`)
});

module.exports = server;