import { Hono } from 'hono';
import { POST as contact } from '../api/contact.js';
import { POST as subscribe } from '../api/subscribe.js';

export default new Hono()
  .post('/api/contact', (context) => contact(context.req.raw))
  .post('/api/subscribe', (context) => subscribe(context.req.raw));
