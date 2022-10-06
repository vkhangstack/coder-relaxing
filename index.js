require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectionDB = require('./database/db');
const girlsCute = require('./routes/girlsCute');
const girlsSexy = require('./routes/girlsSexy');
const contribute = require('./routes/contribute');
const path = require('path');
const key = require('./routes/privateKey');

connectionDB();

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/girls', girlsCute);
app.use('/girls', girlsSexy);
app.use('/girls', contribute);
app.use('/girls', key);
app.get('/', (_req, res) => res.redirect('/girls/cute'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server on listening port ${PORT}...`);
});
