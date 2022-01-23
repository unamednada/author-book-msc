const Book = require('../models/Book');

const getAll = async () => {
  const books = await Book.getAll();

  return books;
};

const getByAuthorId = async (authorId) => {
  const books = await Book.getByAuthorId(authorId);

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
  
  return { code: 201, book: returnBook };
};

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
};
