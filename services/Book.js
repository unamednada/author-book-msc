const Book = require('../models/Book');
const Author = require('../models/Author');

const isValid = async (title, authorId) => {
  if (!title) return { code: 422, message: 'Title required' };
  if (typeof title !== 'string') return { code: 422, message: 'Title must be string' };
  if (!authorId) return { code:422, message: 'Author id required' };
  
  const author = await Author.findById(authorId);
  if (!author) return { code: 404, message: 'Author Notfound' };

  return {};
};

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
  const bookNotValid = await isValid(title, authorId);

  if (bookNotValid.message) return bookNotValid;

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
