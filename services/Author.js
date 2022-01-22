const Author = require('../models/Author');

const format = ({ id, firstName, middleName, lastName }) => ({
  id,
  firstName,
  middleName,
  lastName,
  fullName: [firstName, middleName, lastName].filter(exist => exist).join(' '),
});

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;
  return true;
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
  const authorValid = isValid(firstName, middleName, lastName);

  if (!authorValid) return false;

  await Author.create(firstName, middleName, lastName);

  return true;
};

module.exports = {
  getAll,
  findById,
  create,
};
