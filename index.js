require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { PORT } = process.env;

const Author = require('./controllers/Author');
const Book = require('./controllers/Book');

const { validateAuthor } = require('./middlewares/Author');
const { validateBook } = require('./middlewares/Book');

app.get('/authors/:id', Author.findById);
app.get('/authors', Author.getAll);
app.post('/authors', validateAuthor, Author.create);

app.get('/books/author/:author_id', Book.getByAuthorId);
app.get('/books/:id', Book.findById);
app.get('/books', Book.getAll);
app.post('/books', validateBook, Book.create);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
