const connection = require('./connection');

const QUERIES = {
  getAll: 'SELECT id, title, author_id FROM books',
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

module.exports = {
  getAll,
};
