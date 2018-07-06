const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

router.get('/', auth, (req, res, next) => {
  Todo.find({ owner: req.user }).exec()
    .then(todos => {
      res.json({ todos: todos.map(todo => todo.toJson()) });
    })
    .catch(next);
});

router.get('/:id', auth, (req, res, next) => {
  Todo.findById(req.params.id).exec()
    .then(todo => {
      if (!todo || todo.owner.toString() !== req.payload._id.toString()) {
        return res.status(422).send('invalid id');
      }
      res.json({ todo: todo.toJson() });
    })
    .catch(next);
});

router.post('/', auth, (req, res, next) => {
  const todo = new Todo({
    content: req.body.content,
    owner: req.user,
  });
  todo.save()
    .then(() => res.sendStatus(200))
    .catch(next);
});

router.post('/do', auth, (req, res, next) => {
  if (!req.body.ids || req.body.ids.constructor !== Array) {
    return res.status(422).send('need id(s) of todo(s) to mark as done');
  }

  Todo.find({ _id: { '$in': req.body.ids }, owner: req.user }).exec()
    .then(todos => {
      return todos.map(todo => {
        todo.done = true;
        return todo.save();
      });
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
