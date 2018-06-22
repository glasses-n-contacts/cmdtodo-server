const express = require('express');
const router = express.Router();

const todos = [];
let id = 0;

function getTodoFromId(idParam, res) {
  return todos.find(item => item.id == idParam);
}

router.param('id', (req, res, next, idParam) => {
  const todo = getTodoFromId(idParam, res);
  if (!todo) {
    return res.status(422).send('invalid id');
  }
  req.todo = todo;
  next();
});

router.get('/', (req, res, next) => {
  res.json({ todos });
});

router.get('/:id', (req, res, next) => {
  res.json({ todo: req.todo });
});

router.post('/', (req, res, next) => {
  if (!req.body.content) {
    return res.status(422).send('need content for new todo');
  }

  todos.push({
    id: id++,
    done: false,
    content: req.body.content,
  });
  res.sendStatus(200);
});

router.post('/do', (req, res, next) => {
  if (!req.body.ids || req.body.ids.constructor !== Array) {
    return res.status(422).send('need id(s) of todo(s) to mark as done');
  }

  req.body.ids.forEach(id => {
    const todo = getTodoFromId(id, res);
    if (todo) todo.done = true;
  });
  res.sendStatus(200);
});

module.exports = router;
