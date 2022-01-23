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

  if (!book) {
    return {
      error: {
        code: 'notFound',
        message: 'Book not found',
      },
    };
  }

  return book;
};

const create = async (title, authorId) =>{
  const author = await Author.findById(authorId);

  if (!author) {
    return {
      error: {
        code: 'notFound',
        message: 'Author not found',
      },
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
      error: {
        code: 'notFound',
        message: 'Book not found',
      },
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
