const { validate } = require('../schemas/Book');

const validateBook = async (req, res, next) => {
  const { title, author_id } = req.body;
  const bookNotValid = await validate(title, author_id);

  if (bookNotValid.message) return res.status(bookNotValid.code).json({ message: bookNotValid.message });

  next();
};

module.exports = {
  validateBook,
};
