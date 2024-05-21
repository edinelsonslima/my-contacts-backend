const CorsError = require('../errors/cors');

module.exports = (request, response, next) => {
  const allowedOrigins = ['http://localhost:3000'];
  const origin = request.header('origin');

  if (!allowedOrigins.includes(origin)) {
    return next(new CorsError({ message: 'origin has been blocked by CORS policy' }));
  }

  response.setHeader('Access-Control-Allow-Origin', origin);
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');

  return next();
};
