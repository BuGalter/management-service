import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export async function createTokensJWT(sessionId: string, userId: string) {
  /**
   * The library is used to get tokens jsonwebtoken. Default encryption is SHA256.
   * @param {string} sessionId - User session id.
   * @param (string) userId - User id.
   * @returns {Object<string>} access - User access token. refresh - User refresh token. 
   */
  const access = jwt.sign({ sessionId, userId, }, config.token.tokenKeyAccess,
    { expiresIn: config.token.lifeTimeAccessToken, });

  const refresh = jwt.sign({ sessionId, userId, }, config.token.tokenKeyRefresh,
    { expiresIn: config.token.lifeTimeRefreshToken, });

  return { access, refresh, };
}

export async function decodeTokenJwt(token: string) {
  /**
   * The library is used to verify tokens jsonwebtoken.
   * @param (string) token - Token which user came.
   * @returns {object or boolean} result - Decoded data or false.
   */
  try {
    const result = jwt.verify(token, config.token.tokenKeyAccess);
    return result;
  }
  catch (e) {
    return false;
  }
}
