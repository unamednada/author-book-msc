const Joi = require('joi');
const Book = require('../services/Book');

const getAll = async (_req, res) => {
  const books = await Book.getAll();

  res.status(200).json(books);
};

const getByAuthorId = async (req, res, next) => {
  const { author_id } = req.params;

  const books = await Book.getByAuthorId(author_id);

  if (books.error) return next(books.error);

  res.status(200).json(books);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (book.error) return next(book.error);

  res.status(200).json(book);
};

const create = async (req, res, next) => {
  const { title, author_id } = req.body;
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    author_id:Joi.number().not().empty().required(),
  }).validate({ title, author_id });

  if (error) {
    return next(error);
  }

  const book = await Book.create(title, author_id);

  if (book.error) return next(book.error);

  res.status(201).json(book);
};

const findByTitle = async (req, res, next) => {
  const { title } = req.body;
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
  }).validate({ title });

  if (error) {
    return next(error);
  }

  const book = await Book.findByTitle(title);
  if (book.error) return next(book.error);

  res.status(200).json(book);
};

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
  findByTitle,
};
