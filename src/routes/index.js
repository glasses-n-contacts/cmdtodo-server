const express = require('express');
const router = express.Router();

const todos = [];
let id = 0;

router.param('id', (req, res, next, idParam) => {
  if (isNaN(idParam)) {
    return res.sendStatus(422);
  }

  const id = Number.parseInt(idParam, 10);
  if (id < 0) {
    return res.status(422).send('invalid id');
  }

  const todo = todos.find(item => item.id === id);
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
  todos.push({
    id: id++,
    done: false,
    content: req.body.content,
  });
  res.sendStatus(200);
});

router.post('/do/:id', (req, res, next) => {
  req.todo.done = true;
  res.sendStatus(200);
});

module.exports = router;
