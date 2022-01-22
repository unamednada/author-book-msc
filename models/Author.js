const connection = require('./connection');

const QUERIES = {
  getAll: 'SELECT id, first_name, middle_name, last_name FROM authors',
}

const getAll = async () => {
  const result = await connection.execute(QUERIES.getAll);

  return result;
};

module.exports = {
  getAll,
};
