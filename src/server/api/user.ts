import { User, } from '../models/User';
import { validatePayload, } from '../utils/validate';

export async function userReg(r) {
  const { ...payload } = r.payload;
  const data = await validatePayload(payload);
  if (typeof (data) === 'string') {
    return { status: 404, message: data, };
  }

  const newUser = await User.create(data);
  console.log(newUser);
  return { status: 200, message: 'User added!', };
}
