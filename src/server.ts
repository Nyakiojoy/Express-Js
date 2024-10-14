import express, { Application } from 'express';
import dotenv from 'dotenv';
import postsRoutes from './routes/posts';
import { requestLogger } from './middleware/requestlogger';
import { errorHandler } from './middleware/errorhandler';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/v1/posts', postsRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});