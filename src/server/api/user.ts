import { User, } from '../models/User';
import { Session, } from '../models/Session';
import { validatePayloadReg, validatePayloadAuth, } from '../utils/validate';
import { generateJwt, } from '../utils/auth';
import { output, error, } from '../utils';

export async function userReg(r) {
  const { ...payload } = r.payload;
  const data = await validatePayloadReg(payload);
  if (typeof (data) === 'string') {
    return error(404000, data, null);
  }

  const newUser = await User.create(data);
  return output({ message: `${newUser.name} added!`, });
}

export async function userAuth(r) {
  const { ...payload } = r.payload;
  const data = await validatePayloadAuth(payload);
  if (typeof (data) === 'string') {
    return error(404000, data, null);
  }

  const user = await User.findOne({
    where: { name: data.name, },
  });
  if (user === null) {
    return error(404000, 'User not found!', null);
  }

  const newSession = await Session.create({ userId: user.id, });
  const dataSession = { sessionId: newSession.id, userId: newSession.userId, };
  const tokens = await generateJwt(dataSession);
  return output({ message: tokens.access, });
}
