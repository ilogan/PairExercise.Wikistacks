/* eslint no-console: "off" */
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const { db } = require('./models');
const layout = require('./views/layout');
const main = require('./views/main');

db.authenticate().then(()=> {
  console.log('connected to database')
})

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(main());
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});
