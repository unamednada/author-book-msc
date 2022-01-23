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

  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: 'Author not found',
      },
    };
  }

  return author;
};

const create = async (firstName, middleName, lastName) => {
  const authorExists = await Author.findByName(firstName, middleName, lastName);
  if (authorExists) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Author already exists',
      },
    };
  }
  
  const { insertId } = await Author.create(firstName, middleName, lastName);

  const returnAuthor = format({
    id: insertId,
    firstName,
    middleName,
    lastName,
  });

  return returnAuthor;
};

const findByName = async (firstName, middleName, lastName) => {
  const author = await Author.findByName(firstName, middleName, lastName);

  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: 'Author not found',
      },
    };
  }

  return format(author);
};

module.exports = {
  getAll,
  findById,
  create,
  findByName,
};
