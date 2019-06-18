import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import AuthRouter from './app/auth/AuthRouter';
import UserRouter from './app/user/UserRouter';
import router from './router';

const app = express();

// set cors for only our client domain later
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

app.use(cookieParser('cersei'));

app.use(session({
  secret: 'Ibrakadabra',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true },
}));

app.set('trust proxy', 1); // trust first proxy

const viewsPath = path.resolve('views');
const publicPath = path.resolve('public');

app.get('*.js.gz', (req, res, next) => {
  // req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.set('view cache', true);
app.set('views', viewsPath);
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'dashboard' }));

app.use(express.static(publicPath));

// route categories
app.use('/', router);
app.use('/api/v1', [AuthRouter, UserRouter]);

app.use((req: Request, res: Response, next: any) => {
  res.status(404).render('error404');
});

app.use((error: any, req: Request, res: Response) => {

  const env = req.app.get('env');

  if (env === 'development') {
    res.locals.message = error.message;
    res.locals.error = error;
    res.status(error.status || 500);
    res.render('error');
  } else {
    res.status(500).render('error500');
  }
});

export default app;
