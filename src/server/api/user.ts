import { User, } from '../models/User';
import { Session, } from '../models/Session';
import { generateJwt, } from '../utils/auth';
import { output, error, } from '../utils';

export async function userReg(r) {
  const newUser = await User.create(r.payload);
  return output({ message: `${newUser.name} added!`, });
}

export async function userAuth(r) {
  const user = await User.findOne({
    where: { name: r.payload.name, },
  });
  if (user === null) {
    return error(404000, 'User not found!', null);
  }

  const newSession = await Session.create({ userId: user.id, });
  const dataSession = { sessionId: newSession.id, userId: newSession.userId, };
  const tokens = await generateJwt(dataSession);
  return output({ message: tokens.access, });
}
