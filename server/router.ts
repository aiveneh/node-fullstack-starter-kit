import { Router } from 'express';
import { Auth } from './middlewares/Auth';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome', layout: 'main' });
});

router.get('/faq', (req, res) => {
  res.render('faq', { title: 'FAQ', layout: 'main' });
});

router.get('/blog', (req, res) => {
  res.render('blog', { title: 'Blog', layout: 'main' });
});

router.get('/forgotPassword', (req, res) => res.render('auth'));

export default router;
