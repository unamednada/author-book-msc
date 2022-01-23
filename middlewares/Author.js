const { validate } = require('../schemas/Author');

const validateAuthor = (req, res, next) => {
  const { first_name, middle_name, last_name } = req.body;
  const authorNotValid = validate(first_name, middle_name, last_name);

  if (authorNotValid.message) return res.status(authorNotValid.code).json({ message: authorNotValid.message });

  next();
};

module.exports = {
  validateAuthor,
};
