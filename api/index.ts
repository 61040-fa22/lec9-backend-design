import express from 'express';

// initalize an express app
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
console.log('Listening on port 3000...');
