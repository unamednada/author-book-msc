const connection = require('./connection');

const QUERIES = {
  getAll: 'SELECT id, first_name, middle_name, last_name FROM authors',
  findById: 'SELECT id, first_name, middle_name, last_name FROM authors WHERE id = ?',
}

const format = ({ id, firstName, middleName, lastName }) => ({
  id,
  firstName,
  middleName,
  lastName,
  fullName: [firstName, middleName, lastName].filter(exist => exist).join(' '),
});

const serialize = (authorData) => ({
  id: authorData.id,
  firstName: authorData.first_name,
  middleName: authorData.middle_name,
  lastName: authorData.last_name,
});

const getAll = async () => {
  const [authors] = await connection.execute(QUERIES.getAll);

  return authors.map(serialize).map(format);
};

const findById = async (authorId) => {
  const [authorData] = await connection.execute(QUERIES.findById, [authorId]);

  if (!authorData.length) return null;

  const { firstName, middleName, lastName } = authorData.map(serialize)[0];
  return format({
    id: authorId,
    firstName,
    middleName,
    lastName,
  });
};

module.exports = {
  getAll,
  findById,
};
