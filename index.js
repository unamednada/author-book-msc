require('dotenv').config();

const express = require('express');
const app = express();
const { PORT } = process.env;

const Author = require('./models/Author');

app.get('/authors', async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
