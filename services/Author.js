const Author = require('../models/Author');

const format = ({ id, firstName, middleName, lastName }) => ({
  id,
  firstName,
  middleName,
  lastName,
  fullName: [firstName, middleName, lastName].filter(exist => exist).join(' '),
});

const isValid = (firstName, middleName, lastName) => {
  if (!firstName) return { code: 422, message: 'First name required' };
  if (typeof firstName !== 'string') return { code: 422, message: 'First name must be string' };
  if (!lastName) return { code: 422, message: 'Last name required' };
  if (typeof lastName !== 'string') return { code: 422, message: 'Last name must be string'}
  if (middleName && typeof middleName !== 'string') return { code: 422, message: 'Middle name must be string' };
  return {};
};

const getAll = async () => {
  const authors = await Author.getAll();

  return authors.map(format);
};

const findById = async (id) => {
  const author = await Author.findById(id);

  if (author) return format(author);
  return null;
};

const create = async (firstName, middleName, lastName) => {
  const authorNotValid = isValid(firstName, middleName, lastName);

  if (authorNotValid.message) return authorNotValid;

  const { insertId } = await Author.create(firstName, middleName, lastName);

  const returnAuthor = format({
    id: insertId,
    firstName,
    middleName,
    lastName,
  });

  return { code: 200, author: returnAuthor };
};

module.exports = {
  getAll,
  findById,
  create,
};
