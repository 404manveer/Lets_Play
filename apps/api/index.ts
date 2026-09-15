import express from 'express';
import userRoutes from './users/user.route.js';
import { requestLogger } from './middleware/request-logger.js';
import { notFoundHandler, errorHandler } from './middleware/error-handler.js';

const app = express();
app.use(express.json());
app.use(requestLogger);

// user routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
