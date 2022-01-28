import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { error, } from './index';
import { Session, } from '../models/Session';
import { Errors, } from './errors';

export const generateJwt = (data: object) => {
  console.log(data);
  const access = jwt.sign(data, config.token.access.secret,
    { expiresIn: config.token.access.lifeTime, });

  const refresh = jwt.sign(data, config.token.refresh.secret,
    { expiresIn: config.token.refresh.lifeTime, });

  return { access, refresh, };
};

export function validateSession(tokenType: 'access' | 'refresh') {
  return async function (decoded, r, h) {

    const session = await Session.findByPk(decoded.sessionId);

    if (session) {
      return { isValid: true, credentials: {}, artifacts: { }, };
    }

    throw error(Errors.SessionNotFound, 'User not found', {});
  };
}
