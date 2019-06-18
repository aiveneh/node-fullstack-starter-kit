import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { KEY } from '../../middlewares/AuthMiddleware';

const SALT_ROUNDS = 10;

export interface ILogin {
  email: string;
  password: string;
}

export function generateToken(userId: string) {

  const token = jwt.sign({ data: userId }, KEY, {
    expiresIn: '24h', // expires in 24 hours
  });

  return token;
}

export async function encryptPassword(password: string) {

  return hash(password.trim(), SALT_ROUNDS);

}

export async function comparePassword(providedPassword: string, data) {

  const res = await compare(providedPassword, data.password);

  if (res) {

    return data;

  } else {

    throw new Error('password mismatch');

  }
}
