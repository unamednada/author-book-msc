const { validate } = require('../schemas/Author');

const validateAuthor = (req, res, next) => {
  const { first_name, middle_name, last_name } = req.body;
  const { code, message } = validate(first_name, middle_name, last_name);

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  validateAuthor,
};
