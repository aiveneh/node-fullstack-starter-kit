import { DbConnection } from '../../connection';
import UserRepository from './UserRepository';

const COLLECTION_NAME = 'users';

export function UserData(): UserRepository {

  try {

    return new UserRepository(DbConnection(), COLLECTION_NAME);

  } catch (ex) {

    throw ex;

  }
}

export interface IUser {
  _id?: string;
  token?: string;
  name: string;
  email: string;
  password: string;
};
