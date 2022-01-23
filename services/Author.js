const Author = require('../models/Author');

const format = ({ id, firstName, middleName, lastName }) => ({
  id,
  firstName,
  middleName,
  lastName,
  fullName: [firstName, middleName, lastName].filter(exist => exist).join(' '),
});

const isValid = (firstName, middleName, lastName) => {
  if (!firstName) return { message: 'First name required' };
  if (typeof firstName !== 'string') return { message: 'First name must be string' };
  if (!lastName) return { message: 'Last name required' };
  if (typeof lastName !== 'string') return { message: 'Last name must be string'}
  if (middleName && typeof middleName !== 'string') return { message: 'Middle name must be string' };
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

  return format({
    id: insertId,
    firstName,
    middleName,
    lastName,
  });
};

module.exports = {
  getAll,
  findById,
  create,
};
