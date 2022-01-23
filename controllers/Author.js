const Joi = require('joi');
const Author = require('../services/Author');

const getAll = async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (author.error) return next(author.error);

  res.status(200).json(author);
};

const create = async (req, res, next) => {
  const { first_name, middle_name, last_name } = req.body;
  const { error } = Joi.object({
    first_name: Joi.string().not().empty().required(),
    last_name: Joi.string().not().empty().required(),
    middle_name: Joi.string().not().empty(),
  }).validate({ first_name, middle_name, last_name });
  
  if (error) {
    return next(error);
  }

  const author = await Author.create(first_name, middle_name, last_name);

  if (author.error) return next(author.error);

  res.status(201).json(author);
};

const findByName = async (req, res, next) => {
  const { first_name, middle_name, last_name } = req.body;
  const { error } = Joi.object({
    first_name: Joi.string().not().empty().required(),
    last_name: Joi.string().not().empty().required(),
    middle_name: Joi.string().not().empty(),
  }).validate({ first_name, middle_name, last_name });

  if (error) {
    return next(error);
  }

  const author = await Author.findByName(first_name, middle_name, last_name);
  if (author.error) return next(error);

  res.status(200).json(author);
};

module.exports = {
  getAll,
  findById,
  create,
  findByName,
};
