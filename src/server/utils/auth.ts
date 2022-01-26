import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { error, } from './index';
import { Session, } from '../models/Session';
import { Errors, } from './errors';

export const generateJwt = (data: object) => {
  const access = jwt.sign(data, config.token.access.secret,
    { expiresIn: config.token.access.lifeTime, });

  const refresh = jwt.sign(data, config.token.refresh.secret,
    { expiresIn: config.token.refresh.lifeTime, });

  return { access, refresh, };
};

export const decodeJwt = async (token: string, secret: string) => {
  try {
    return await jwt.verify(token, secret);
  }
  catch (e) {
    const code = e.name === 'TokenExpiredError' ? Errors.TokenExpired : Errors.TokenInvalid;
    const msg = e.name === 'TokenExpiredError' ? 'Token expired' : 'Token invalid';
    throw error(code, msg, {});
  }
};

export type validateFunc = (r, token: string) => Promise<any>;

// Fabric which returns token validate function depending on token type
export function tokenValidate(tokenType: 'access' | 'refresh'): validateFunc {
  return async function (r, token: string) {
    const data = await decodeJwt(token, config.token[tokenType].secret);

    const session = await Session.findByPk(data.sessionId);

    if (session) {
      return { isValid: true, credentials: {}, artifacts: { }, };
    }

    throw error(Errors.SessionNotFound, 'User not found', {});
  };
}
