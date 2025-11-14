const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 7777;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'java_ludo',
  password: '2wfafphwerwefasfa23742385e6',
  database: 'java_ludo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/select', (req, res) => {
  app.use(bodyParser.json());
  const { query } = req.body;
  if (!query) {
    return res.status(400).send('Query is required');
  }
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error.stack);
      return res.status(500).send('Error executing query');
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});