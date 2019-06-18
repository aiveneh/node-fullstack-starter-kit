import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const KEY = 'withlovefromkansas';
export const COOKIE_NAME = '_cr256T';

export const COOKIE_OPTIONS = {
  maxAge: 1000 * 60 * 60 * 3, // would expire after 3 hours
  httpOnly: true, // The cookie only accessible by the web server
  signed: false, // Indicates if the cookie should be signed
  // TODO use signed cookies later on
};

export function Auth(req: Request, res: Response, next: any) {

  const token = req.cookies[COOKIE_NAME] || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, KEY, (error: any, result: any) => {
      if (error) {
        res.status(500).redirect('/login?redirect=true?invalid-token=true');
      } else {
        res.locals.body = result;
        next();
      }
    });
  } else {
    res.status(403).redirect('/login/?redirect=true');
  }
}
