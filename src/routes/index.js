const express = require('express');
const router = express.Router();

const todos = [];

router.param('id', (req, res, next, idParam) => {
  if (isNaN(idParam)) {
    return res.sendStatus(422);
  }

  const id = Number.parseInt(idParam, 10);
  if (id < 0 || id >= todos.length) {
    return res.status(422).send('id out of range');
  }

  req.id = id;
  next();
});

router.get('/', (req, res, next) => {
  res.json(todos);
});

router.get('/:id', (req, res, next) => {
  res.json(todos[req.id]);
});

router.post('/', (req, res, next) => {
  todos.push({
    done: false,
    content: req.body.content,
  });
  res.sendStatus(200);
});

router.post('/do/:id', (req, res, next) => {
  todos[req.id].done = true;
  res.sendStatus(200);
});

module.exports = router;
