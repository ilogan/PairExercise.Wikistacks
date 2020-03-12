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
app.use('/wiki', require('./routes/wiki'))
app.use('/user', require('./routes/user'))

app.get('/', (req, res, next) => {
  try{
  res.redirect(301,'/wiki');
  } catch(err) {
    next(err)
  }
});

const PORT = 3000;

let sync = async () => {
await db.sync({force: true})
app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});
}

sync()



