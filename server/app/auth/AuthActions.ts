import { validate } from 'joi';
import { IUser, UserData } from '../user/UserData';
import { comparePassword, generateToken, ILogin } from './AuthData';
import { LoginSchema } from './AuthSchemas';

export async function Login(data: ILogin) {

  const res = await validate(data, LoginSchema);

  const { email, password } = res;

  const user = await UserData().findOne({ email });

  if (!user) {

    throw new Error('user not found');

  }

  const passwordCheck = await comparePassword(password, user);

  const token = generateToken(user._id);

  Object.assign(user, { token });

  // delete sensitive data on login, try and make this happen from core with projections
  delete user.password;

  return user;

}

export async function Logout() { }

export async function SendPasswordResetMail(data: IUser) { }

export async function SetPassword(data: IUser) { }
