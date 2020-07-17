const mongoose = require('mongoose');

const topicsSchema = new mongoose.Schema({
  subject: {
    type: String
  },
  description: {
    type: String
  },
  status: {
    type: Boolean
  },
  id: {
    type: Number
  },
  text: {
    type: String
  }
},
{timestamps: true}
);

topicsSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('topic', topicsSchema);