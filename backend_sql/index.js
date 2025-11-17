import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import BggSqlMngrService from './searchbgg.js';
import BggScraper from './scrapebgg.js';
import BggSearcher from './searchbgg.js';

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

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/select', (req, res) => {
  console.log(req.body.query);
  const query  = req.body.query;
  console.log(query)
  if (!query) {
    return res.status(400).send('Query is required');
  }
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error.stack);
      return res.status(500).send('Error executing query');
    }
    console.log("Query executed successfully");
    console.log(results);
    res.status(200).json({sdata:results});
  });
});


app.post('/insert', (req, res) => {
  console.log(req.body.query);
  const query  = req.body.query;
  console.log(query)
  if (!query) {
    return res.status(400).send('Query is required');
  }
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error.stack);
      return res.status(500).send('Error executing query');
    }
    console.log("Query executed successfully");
    return res.status(200);
  });
});


app.post('/search',async (req, res) => {
  console.log(req.body.title);
  const title  = req.body.title;
  var results=await BggSearcher.searchTitle(title);
  console.log("Results =",results)
  if(results){
    res.status(200).json({sdata:results})
  }
  else{
    console.error('Error searching title:', error);
    res.status(500).send('Error searching title');
  }
});

app.post('/scrape',async (req, res) => {
  console.log(req.body.ID);
  const ID  = req.body.ID;
  var results=await BggScraper.searchID(title);
  console.log("Results =",results)
  if(results){
    res.status(200).json({sdata:results})
  }
  else{
    console.error('Error searching title:', error);
    res.status(500).send('Error searching title');
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


