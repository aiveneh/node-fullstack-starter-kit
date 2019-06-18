import { Request, Response } from 'express';
import { COOKIE_NAME, COOKIE_OPTIONS } from '../../middlewares/AuthMiddleware';
import { Failure, Success } from '../ReponseHandlers';
import * as AuthActions from './AuthActions';

export function Login(req: Request, res: Response) {

  AuthActions.Login(req.body)
    .then(result => {
      res.cookie(COOKIE_NAME, result.token, COOKIE_OPTIONS);
      Success(res, result, 'login successful');
    })
    .catch(error => Failure(res, error, 'error in retrieving Users'));

}
