const express = require('express');
const helmet = require('helmet')

const app = express();
const port = process.env.PORT;

if (!port) {
  console.log('Error: PORT environment variable is not set.');
  return;
}

// Security

app.use(helmet());
app.disable('x-powered-by')

// Body parser

app.use(express.json());

// Routes

app.get('/', (req, res) => {
  res.send('Vapor server is running!');
});

app.use('/product', require('./app/routers/product.router'));

// Listener

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});