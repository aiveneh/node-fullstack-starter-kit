import { ObjectID } from 'mongodb';
import { UserData } from './UserData';

export async function GetUsers() {

  return UserData().find();

}

export async function GetUser(id) {

  const newId = new ObjectID(id);

  const res = await UserData().findOne({ _id: newId });

  delete res.password;

  return res;
}
