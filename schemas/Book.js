const Author = require('../models/Author');

const errors = {
  title_blank: 'Title required',
  title_not_string: 'Title must be string',
  authorId_blank: 'Author id required',
  author_not_found: 'Author Notfound',
};

const blank = value => !value;
const notString = value => typeof value !== 'string';
const authorNotFound = async (authorId) => {
  const author = await Author.findById(authorId);
  if (!author) return true;
  return false;
};

const validate = async (title, authorId) => {
  if (blank(title)) return { code: 422, message: errors.title_blank };
  if (notString(title)) return { code: 422, message: errors.title_not_string };
  if (blank(authorId)) return { code:422, message: errors.authorId_blank };
  if (await authorNotFound(authorId)) return { code: 404, message: errors.author_not_found };

  return {};
};

module.exports = {
  validate,
};
