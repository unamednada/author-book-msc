const { validate } = require('../schemas/Author');
const Author = require('../models/Author');

const validateAuthor = (req, res, next) => {
  const { first_name, middle_name, last_name } = req.body;
  const { code, message } = validate(first_name, middle_name, last_name);

  if (message) return res.status(code).json({ message });

  next();
};

const validateAuthorId = async (req, res, next) => {
  const { author_id } = req.params;
  const author = await Author.findById(author_id);

  if (!author) return res.status(404).json({ message: 'Author Notfound' });

  next();
};

module.exports = {
  validateAuthor,
  validateAuthorId,
};
