const Author = require('../models/Author');

const format = ({ id, firstName, middleName, lastName }) => ({
  id,
  firstName,
  middleName,
  lastName,
  fullName: [firstName, middleName, lastName].filter(exist => exist).join(' '),
});

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
  const { insertId } = await Author.create(firstName, middleName, lastName);

  const returnAuthor = format({
    id: insertId,
    firstName,
    middleName,
    lastName,
  });

  return returnAuthor;
};

module.exports = {
  getAll,
  findById,
  create,
};
