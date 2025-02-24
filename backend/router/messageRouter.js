import { Router } from 'express';

const messageRouter = Router();

messageRouter.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

messageRouter.post('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

messageRouter.put('/:id', (req, res) => {
  res.json({ message: 'Hello World' });
});

messageRouter.delete('/:id', (req, res) => {
  res.json({ message: 'Hello World' });
});
export default messageRouter;
