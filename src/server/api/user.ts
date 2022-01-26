import { User, } from '../models/User';
import { Session, } from '../models/Session';
import { validatePayloadReg, validatePayloadAuth, } from '../utils/validate';
import { createTokensJWT, } from '../utils/token';

export async function userReg(r) {
  const { ...payload } = r.payload;
  const data = await validatePayloadReg(payload);
  if (typeof (data) === 'string') {
    return { status: 404, message: data, };
  }

  const newUser = await User.create(data);
  return { status: 200, message: `${newUser.name} added!`, };
}

export async function userAuth(r) {
  const { ...payload } = r.payload;
  const data = await validatePayloadAuth(payload);
  if (typeof (data) === 'string') {
    return { status: 404, message: data, };
  }

  const user = await User.findOne({
    where: { name: data.name, },
  });
  if (user === null) {
    return { status: 404, message: 'User not found!', };
  }

  const newSession = await Session.create({ userId: user.id, });
  const tokens = await createTokensJWT(newSession.id, user.id);
  return { status: 200, message: tokens.access, };
}
