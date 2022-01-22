require('dotenv').config();

const express = require('express');
const app = express();
const { PORT } = process.env;

const Author = require('./models/Author');
const Book = require('./models/Book');

app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: 'Author Notfound' });

  res.status(200).json(author);
});

app.get('/authors', async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
});

app.get('/books/:author_id', async (req, res) => {
  const { author_id } = req.params;

  const books = await Book.getByAuthorId(author_id);

  if (!books) return res.status(404).json({ message: 'Books Notfound' });

  res.status(200).json(books);
});

app.get('/books', async (_req, res) => {
  const books = await Book.getAll();

  res.status(200).json(books);
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
