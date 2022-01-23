const { validate } = require('../schemas/Book');

const validateBook = async (req, res, next) => {
  const { title, author_id } = req.body;
  const { code, message} = await validate(title, author_id);

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  validateBook,
};
