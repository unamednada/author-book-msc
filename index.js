require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { PORT } = process.env;

const Author = require('./services/Author');
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

app.post('/authors', async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
  
  const author = await Author.create(first_name, middle_name, last_name);

  if (!author) return res.status(400).json({ message: 'Datanotvalid' });

  res.status(201).json({ message: 'Author created' });
});

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

  if (!Book.isValid(title, author_id)) return res.status(400).json({ message: 'Datanotvalid' });

  await Book.create(title, author_id);
  res.status(201).json({ message: 'Book created' });
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
