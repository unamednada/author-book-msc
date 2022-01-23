const connection = require('./connection');
const Author = require('./Author');

const QUERIES = {
  getAll: 'SELECT id, title, author_id FROM books',
  getByAuthorId: 'SELECT id, title, author_id FROM books WHERE author_id = ?',
  findById: 'SELECT id, title, author_id FROM books WHERE id = ?',
  create: 'INSERT INTO model_example.books (title, author_id) VALUES (?, ?)',
  findByTitle: 'SELECT id, title, author_id FROM books WHERE title = ?',
};

const serialize = (bookData) => ({
  id: bookData.id,
  title: bookData.title,
  authorId: bookData.author_id,
});

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
  const [book] = await connection.execute(QUERIES.create, [title, authorId]);
  return book;
};

const findByTitle = async (title) => {
  const [bookData] = await connection.execute(QUERIES.findByTitle, [title]);

  if (!bookData.length) return null;

  return bookData[0];
};

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
  findByTitle,
};
