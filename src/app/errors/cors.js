module.exports = class CorsError extends Error {
  constructor({ message = 'Forbidden', status = 403 }) {
    super(message);
    this.status = status;
  }
};
