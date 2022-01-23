const Author = require('../services/Author');

const getAll = async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: 'Author Notfound' });

  res.status(200).json(author);
};

const create = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  const author = await Author.create(first_name, middle_name, last_name);

  res.status(201).json(author);
};

module.exports = {
  getAll,
  findById,
  create,
};
