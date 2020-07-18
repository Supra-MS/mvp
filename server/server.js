const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const Topics = require('./models/topics.js');
const Quiz = require('./models/quiz.js');
const quizData = require('./data/quizData.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + './../client/dist'));
app.use('/', router);

/* Mongoose DB */
mongoose.connect('mongodb://localhost/quicknotes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => console.log('!!! Mongoose is connected !!!'));

/* Routes calling controllers to interact with db & to send the response */
router.get('/topics', (req, res) => {
  console.log('--Render topics list page--');
  let searchTopic = req.query.topic;
  console.log('searchTopic: ', req.query.topic, searchTopic);
  let condition = searchTopic ? { subject: { $regex: new RegExp(searchTopic), $options: "i"} } : {}; //
  console.log('Condition: ', condition);

  Topics.find(condition)
   .then(data => {
     console.log('Get data: ', data);
     res.send(data);
   })
   .catch(error => {
    res.status(500).send({message: error.message || 'Error in retrieving the topic'});
  })
});

router.post('/topics', (req, res) => {
  console.log('Successfully posted', req.body);
  let topicData = {
    subject: req.body.subject,
    description: req.body.description,
    status: req.body.status ? req.body.status : false,
    text: ''
  }
  Topics.create(topicData)
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({message: error.message || 'Error in creating the topic'});
    })
});

router.delete('/topics', (req, res) => {
  Topics.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} topics are deleted successfully!`
      })
    })
    .catch(error => {
      res.status(500).send({message: error.message || 'Error in deleting the topic'});
    })
});

router.get('/topics/:id', (req, res) => {
  console.log(req.params, 'By id');
  Topics.findById(req.params.id)
    .then(data => {
      if(!data) {
        res.status(404).send({ message: `Unable to find the topic by id ${req.params.id}` });
      } else {
        res.send(data);
      }
    })
    .catch(error => {
      res.status(500).send({ message: `Error retrieving the topic by id` });
    })
});

router.delete('/topics/:id', (req, res) => {
  let id = req.params.id;
  Topics.findByIdAndRemove(id, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Unable to delete topic with id=${id}!`
      });
    } else {
      res.send({
        message: "Topic deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error deleting the topic by id`
    });
  });
});

router.put('/topics/:id', (req, res) => {
  let id = req.params.id;
  Topics.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Unable to update topic with id=${id}!`
      });
    } else {
      res.send({
        message: "Topic updated successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating the topic by id`
    });
  });
});

router.get('/quiz', (req, res) => {
  Quiz.find({})
  .then(data => {
    console.log('Get quiz data: ', data);
    res.send(data);
  })
  .catch(error => {
   res.status(500).send({message: error.message || 'Error in retrieving the quiz data'});
 })
});

app.listen(port, () => console.log(`*** Server is listening on http://localhost:${port} ***`));