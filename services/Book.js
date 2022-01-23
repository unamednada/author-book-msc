const Book = require('../models/Book');
const Author = require('../models/Author');

const getAll = async () => {
  const books = await Book.getAll();

  return books;
};

const getByAuthorId = async (authorId) => {
  const author = await Author.findById(authorId);

  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: 'Author not found',
      },
    };
  }

  const books = await Book.getByAuthorId(authorId);

  if (!books) {
    return {
      error: {
        code: 'notFound',
        message: 'Books not found',
      },
    };
  }

  return books;
};

const findById = async (id) => {
  const book = await Book.findById(id);

  return book;
};

const create = async (title, authorId) =>{
  const { insertId } = await Book.create(title, authorId);

  const returnBook = ({
    id: insertId,
    title,
    authorId,
  });
  
  return returnBook;
};

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
};
