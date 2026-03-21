const express = require('express');
const bodyParser = require('body-parser');

const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 8080;

// Body parser middleware FIRST
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTION',
  );
  next();
});

// Routes AFTER middleware
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node Running on port ${port}`);
    });
  }
});
