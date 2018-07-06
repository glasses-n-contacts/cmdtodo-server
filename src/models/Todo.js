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

TodoSchema.methods.toJson = function() {
  return {
    id: this._id.toString(),
    content: this.content,
    done: this.done,
  };
};

mongoose.model('Todo', TodoSchema);
