require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { PORT } = process.env;

const Author = require('./controllers/Author');
const Book = require('./services/Book');

app.get('/authors/:id', Author.findById);
app.get('/authors', Author.getAll);
app.post('/authors', Author.create);

app.get('/books/author/:author_id', async (req, res) => {
  const { author_id } = req.params;

  const books = await Book.getByAuthorId(author_id);

  if (!books) return res.status(404).json({ message: 'Books Notfound' });

  res.status(200).json(books);
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) return res.status(404).json({ message: 'Book Notfound' });

  res.status(200).json(book);
});

app.get('/books', async (_req, res) => {
  const books = await Book.getAll();

  res.status(200).json(books);
});

app.post('/books', async (req, res) => {
  const { title, author_id } = req.body;
  const book = await Book.create(title, author_id);

  if (!book) return res.status(400).json({ message: 'Datanotvalid' });

  res.status(201).json(book);
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
