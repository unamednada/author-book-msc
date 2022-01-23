const Book = require('../services/Book');

const getAll = async (_req, res) => {
  const books = await Book.getAll();

  res.status(200).json(books);
};

const getByAuthorId = async (req, res) => {
  const { author_id } = req.params;

  const books = await Book.getByAuthorId(author_id);

  if (!books) return res.status(404).json({ message: 'Books Notfound' });

  res.status(200).json(books);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) return res.status(404).json({ message: 'Book Notfound' });

  res.status(200).json(book);
};

const create = async (req, res) => {
  const { title, author_id } = req.body;
  const book = await Book.create(title, author_id);

  if (book.message) return res.status(400).json({ message: book.message });

  res.status(201).json(book);
};

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
};
