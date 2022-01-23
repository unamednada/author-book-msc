const Book = require('../models/Book');
const Author = require('../models/Author');

const NOT_FOUND = 'notFound';
const ALREADY_EXISTS = 'alreadyExists';

const errors = {
  author_not_found: {
    code: NOT_FOUND,
    message: 'Author not found',
  },
  book_already_exists: {
    code: ALREADY_EXISTS,
    message: 'Book already exists',
  },
  book_not_found: {
    code: NOT_FOUND,
    message: 'Book(s) not found',
  },
};

const getAll = async () => {
  const books = await Book.getAll();

  return books;
};

const getByAuthorId = async (authorId) => {
  const author = await Author.findById(authorId);

  if (!author) {
    return {
      error: errors.author_not_found,
    };
  }

  const books = await Book.getByAuthorId(authorId);

  if (!books) {
    return {
      error: errors.book_not_found,
    };
  }

  return books;
};

const findById = async (id) => {
  const book = await Book.findById(id);

  if (!book) {
    return {
      error: errors.book_not_found,
    };
  }

  return book;
};

const create = async (title, authorId) =>{
  const author = await Author.findById(authorId);

  if (!author) {
    return {
      error: errors.author_not_found,
    };
  }

  const bookExists = await Book.findByTitle(title);

  if (bookExists) {
    return {
      error: errors.book_already_exists,
    };
  }

  const { insertId } = await Book.create(title, authorId);

  const returnBook = ({
    id: insertId,
    title,
    authorId,
  });
  
  return returnBook;
};

const findByTitle = async (title) => {
  const book = await Book.findByTitle(title);

  if (!book) {
    return {
      error: errors.book_not_found,
    };
  }

  return book;
}

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
  findByTitle,
};
