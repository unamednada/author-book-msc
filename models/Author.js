const connection = require('./connection');

let middleNameQuery = ''
const QUERIES = {
  getAll: 'SELECT id, first_name, middle_name, last_name FROM authors;',
  findById: 'SELECT id, first_name, middle_name, last_name FROM authors WHERE id = ?;',
  create: 'INSERT INTO model_example.authors (first_name, middle_name, last_name) VALUES (?, ?, ?);',
  findByName: `SELECT id, first_name, middle_name, last_name FROM model_example.authors WHERE first_name = ? ${middleNameQuery} AND last_name = ?;`,
};

const serialize = (authorData) => ({
  id: authorData.id,
  firstName: authorData.first_name,
  middleName: authorData.middle_name,
  lastName: authorData.last_name,
});

const getAll = async () => {
  const [authors] = await connection.execute(QUERIES.getAll);

  return authors.map(serialize);
};

const findById = async (authorId) => {
  const [authorData] = await connection.execute(QUERIES.findById, [authorId]);

  if (!authorData.length) return null;

  const { firstName, middleName, lastName } = authorData.map(serialize)[0];
  
  return ({
    id: authorId,
    firstName,
    middleName,
    lastName,
  });
};

const create = async (firstName, middleName, lastName) => {
  const [author] = await connection.execute(QUERIES.create, [firstName, middleName || null, lastName]);
  return author;
};

const findByName = async (firstName, middleName, lastName) => {
  const params = [firstName, lastName];
  if (middleName) {
    middleNameQuery = 'AND middle_name = ?';
    params.splice(1, middleName);
  };

  const [authorData] = await connection.execute(QUERIES.findByName, params);

  if (!authorData.length) return null;

  const author = authorData[0];
  return serialize(author);
};

module.exports = {
  getAll,
  findById,
  create,
  findByName,
};
