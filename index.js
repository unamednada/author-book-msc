require('dotenv').config();

const express = require('express');
const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { PORT } = process.env;

const Author = require('./controllers/Author');
const Book = require('./controllers/Book');

const { validateAuthorId } = require('./middlewares/Author');
const { validateBook } = require('./middlewares/Book');

app.get('/authors/name/', rescue(Author.findByName));
app.get('/authors/:id', rescue(Author.findById));
app.get('/authors', rescue(Author.getAll));
app.post('/authors', rescue(Author.create));

app.get('/books/author/:author_id', validateAuthorId, Book.getByAuthorId);
app.get('/books/:id', Book.findById);
app.get('/books', Book.getAll);
app.post('/books', validateBook, Book.create);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
