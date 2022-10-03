import express from 'express';

const router = express.Router();

const messages = [
  {content: 'Hello class!'}
];

router.get('/', function(req, res) {
  let html = `
  What would you like me to say?
  <form action="/announcements" method="POST">
    <input type="text" name="msg" value="" autofocus="true">
    <input type="submit" value="Submit">
  </form>
  `;

  html += `<pre>${messages.map(m => m.content).join('\n')}</pre>`;
  res.send(html)
});

// Express "middleware" (helper) to parse POST requests 
router.use(express.urlencoded({ extended: true }));

router.post('/', function(req, res, next) {
  messages.push({content: req.body.msg});
  res.send(`<pre>${messages.map(m => m.content).join('\n')}</pre>`);
});

export {router};
