import { Request, Response } from 'express';
import { Failure, Success } from '../ReponseHandlers';
import * as UserActions from './UserActions';

export function GetUsers(req: Request, res: Response) {

  UserActions.GetUsers()
    .then(result => Success(res, result, 'users fetched'))
    .catch(error => Failure(res, error, 'error in fetching users'));

}

export function GetUser(req: Request, res: Response) {
  const { id } = req.params;

  UserActions.GetUser(id)
    .then(result => Success(res, result, 'user fetched'))
    .catch(error => Failure(res, error, 'error in fetching user'));

}
