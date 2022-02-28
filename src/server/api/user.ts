import { User, } from '../models/User';
import { Session, } from '../models/Session';
import { generateJwt, } from '../utils/auth';
import { output, error, } from '../utils';

export async function userReg(r) {
  const { name, } = r.payload;
  const newUser = await User.findOne({
    where: { name, },
  });
  if (!newUser) {
    await User.create(r.payload);
    return output({ message: `User ${name} added!`, });
  }

  return error(400000, `User ${name} already exists!`, null);
}

export async function userAuth(r) {
  const user = await User.findOne({
    where: { name: r.payload.name, },
  });
  if (!user) {
    return error(404000, 'User not found!', null);
  }

  if (!await user.passwordCompare(r.payload.password)) {
    return error(404000, 'Wrong password!', null);
  }

  const newSession = await Session.create({ userId: user.id, });
  const tokens = await generateJwt({ sessionId: newSession.id, userId: newSession.userId, });
  return output({ token: tokens.access, userId: newSession.userId, });
}

export async function userChangeInfo(r) {
  const { data, } = r.payload;
  const user = await User.findByPk(r.params.userId);
  if (!user) {
    return error(404000, 'User not found!', null);
  }

  await user.update(data);
  return output({ message: `User ${user.name} data update!`, });
}
