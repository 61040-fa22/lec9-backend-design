import express from 'express';
import path from 'path';
import {engine as handlebars} from 'express-handlebars';
import {router as announcements} from './announcements';

// initalize an express app
const app = express();

// handlebars templating view engine setup
app.engine('html', handlebars({extname: '.html', defaultLayout: false}));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Matches paths ending in fly (e.g., butterfly, dragonfly)
app.get(/.*fly$/, (req, res) => {
  res.send('Hello fly!')
});

// Route params capture pieces of the path for use
app.get('/flights/:from-:to', (req, res) => {
  res.send(req.params);
});

const profs = {
  arvind: {office: '32-G706', research: 'data vis'},
  daniel: {office: '32-G704', research: 'software design'}
};

app.get('/profs/:name', (req, res) => {
  const prof = profs[req.params.name];
  if (req.query.property) {
    res.send(prof[req.query.property]);
  } else if (prof) {
    res.send(prof);
  }
});

// Use express.Router to modularize the web server
app.use('/announcements', announcements);

app.listen(3000);
console.log('Listening on port 3000...');
