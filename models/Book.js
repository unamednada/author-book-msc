const connection = require('./connection');
const Author = require('./Author');

const QUERIES = {
  getAll: 'SELECT id, title, author_id FROM books',
  getByAuthorId: 'SELECT id, title, author_id FROM books WHERE author_id = ?',
  findById: 'SELECT id, title, author_id FROM books WHERE id = ?',
  create: 'INSERT INTO model_example.books (title, author_id) VALUES (?, ?)',
};

const serialize = (bookData) => ({
  id: bookData.id,
  title: bookData.title,
  authorId: bookData.author_id,
});

const isValid = (title, authorId) => {
  if (!title || typeof title !== 'string') return false;
  
  const author = Author.findById(authorId);
  if (!authorId || !author) return false;

  return true;
};

const getAll = async () => {
  const [books] = await connection.execute(QUERIES.getAll);

  return books.map(serialize);
};

const getByAuthorId = async (authorId) => {
  const [books] = await connection.execute(QUERIES.getByAuthorId, [authorId]);

  if (!books.length) return null;

  return books.map(serialize);
};

const findById = async (bookId) => {
  const [bookData] = await connection.execute(QUERIES.findById, [bookId]);

  if (!bookData.length) return null;

  return bookData.map(serialize)[0];
};

const create = async (title, authorId) => {
  await connection.execute(QUERIES.create, [title, authorId]);
};

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  isValid,
  create,
};
