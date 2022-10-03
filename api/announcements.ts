import express from 'express';

const router = express.Router();

const messages = [
  {content: 'Hello class!'}
];

router.get('/', function(req, res) {
  res.render('message-board', {messages: messages});
});

// Express "middleware" (helper) to parse POST requests 
router.use(express.urlencoded({ extended: true }));

router.post('/', function(req, res, next) {
  messages.push({content: req.body.msg});
  res.render('message-board', {messages: messages});
});

export {router};
