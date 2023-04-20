/* eslint-disable no-console */
require('express-async-errors');
const express = require('express');

const app = express();
const routes = require('./routes');

const cors = require('./app/middleware/cors');
const errorHandler = require('./app/middleware/errorHandler');

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Server is running on port 3001'));
