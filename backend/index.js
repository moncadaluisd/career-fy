import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

import applyRouter from './router/applyRouter.js';
import coverletterRouter from './router/coverletterRouter.js';
import curriculumRouter from './router/curriculumRouter.js';
import messageRouter from './router/messageRouter.js';
import { handleErrors } from './middleware/handleErrors.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware clerk
app.use(clerkMiddleware());

app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Routes users
app.use('/api/applies', applyRouter);
app.use('/api/coverletters', coverletterRouter);
app.use('/api/curriculums', curriculumRouter);
app.use('/api/messages', messageRouter);

app.use(handleErrors);
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
