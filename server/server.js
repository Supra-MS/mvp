const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const router = express.Router();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + './../client/dist'));
app.use('/', router);

mongoose.connect('mongodb://localhost/quicknotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('!!! Mongoose is connected !!!'));

app.listen(port, () => console.log(`*** Server is listening on http://localhost:${port} ***`));
