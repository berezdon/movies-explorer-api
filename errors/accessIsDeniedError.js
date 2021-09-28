class accessIsDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = accessIsDeniedError;
