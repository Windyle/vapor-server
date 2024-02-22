import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { ProductRouter } from './routers/product.router';
import { logger } from './services/utils/logger.service';

const app = express();
const port = process.env.PORT;

if (!port) {
  logger.error('Error: PORT environment variable is not set.');
  process.exit(1);
}

// Security
app.use(helmet());
app.use(cors());
app.disable('x-powered-by')

// Body parser
app.use(express.json({ limit: '2mb' }));

// Authorization middleware
app.use((req, res, next) => {
  if(req.headers['authorization'] !== 'Bearer vapor') {
    res.status(401).send();
    return;
  }

  next();
});

// Request logger middleware
app.use((req, res, next) => {
  
  // Log the request
  logger.debug(`Request: ${req.method} ${req.url} - From: ${req.socket.remoteAddress}`);

  // Log the response
  res.on('finish', () => {
    logger.debug(`Response: ${res.statusCode} ${res.statusMessage} - To: ${req.socket.remoteAddress}`);
  });

  next();
});

// Routes

app.get('/', (req, res) => {
  res.send('Vapor server is running!');
});

app.use('/product', ProductRouter);

// Listener

app.listen(port, () => {
  logger.debug(`Server started on port ${port}`);
});