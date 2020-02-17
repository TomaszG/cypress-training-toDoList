const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Tasks = require('./models/todoListModel');
const routes = require('./routes/todoListRoutes');

const app = express();
const port = process.env.PORT || 3000;
const dbConnectionString = process.env.DB_CONNECTION_STRING || 'mongodb://db/Tododb';

mongoose.Promise = global.Promise;
mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'], // headers that React is sending to the API
  exposedHeaders: ['Origin, X-Requested-With, Content-Type, Accept'], // headers that you are sending back to React
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}));
routes(app);
app.use(function(req, res) {
  res.status(404).send({ url: `${req.originalUrl } not found` });
});

app.listen(port);

// eslint-disable-next-line no-console
console.log(`API started on: ${port}`);
