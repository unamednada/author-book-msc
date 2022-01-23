require('dotenv').config();

const express = require('express');
const app = express();
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { PORT } = process.env;

const Author = require('./controllers/Author');
const Book = require('./controllers/Book');

const errorMiddleware = require('./middlewares/error');

app.get('/authors/name/', rescue(Author.findByName));
app.get('/authors/:id', rescue(Author.findById));
app.get('/authors', rescue(Author.getAll));
app.post('/authors', rescue(Author.create));

app.get('/books/author/:author_id', rescue(Book.getByAuthorId));
app.get('/books/title', rescue(Book.findByTitle));
app.get('/books/:id', rescue(Book.findById));
app.get('/books', rescue(Book.getAll));
app.post('/books', rescue(Book.create));

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
