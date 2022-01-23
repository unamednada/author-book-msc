const Book = require('../models/Book');
const Author = require('../models/Author');

const isValid = async (title, authorId) => {
  if (!title || typeof title !== 'string') return false;
  if (!authorId) return false;
  
  const author = await Author.findById(authorId);
  if (!author) return false;

  return true;
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
  const bookValid = await isValid(title, authorId);

  if (!bookValid) return false;

  const { insertId } = await Book.create(title, authorId);

  return ({
    id: insertId,
    title,
    authorId,
  });
};

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
};
