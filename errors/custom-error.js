class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

const customError = (msg, statusCode) => (new CustomAPIError(msg, statusCode));

export {
  customError,
  CustomAPIError,
}
