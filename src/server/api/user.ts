import { User, } from '../models/User';
import { Session, } from '../models/Session';
import { generateJwt, } from '../utils/auth';
import { output, error, } from '../utils';

export async function userReg(r) {
  try {
    const newUser = await User.build(r.payload);
    await newUser.save();
    return output({ message: `${newUser.name} added!`, });
  }
  catch (err) {
    return error(400000, `Error: ${err.errors[0].message}!`, null);
  }
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
  return output({ message: tokens.access, });
}
