const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'can\'t be blank'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  done: {
    type: Boolean,
    default: false,
  },
});

mongoose.model('Todo', TodoSchema);
