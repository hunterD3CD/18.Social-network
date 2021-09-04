// import packages
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

// it tells Mongoose which database we want to connect to
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
// above mongoose version 6.0, configuration not work
  // useFindAndModify: false,
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));