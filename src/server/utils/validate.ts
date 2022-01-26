import { schemaUser, schemaAuth, } from '../schemes';
import { decodeTokenJwt, } from './token';
import { Session, } from '../models/Session';

export async function validatePayloadReg(payload) {
  try {
    const value = await schemaUser.validateAsync(payload);
    return value;
  }
  catch (error) {
    return error.message;
  }
}

export async function validatePayloadAuth(payload) {
  try {
    const value = await schemaAuth.validateAsync(payload);
    return value;
  }
  catch (error) {
    return error.message;
  }
}

export async function validateSession(request, token, h) {
  /**
   * Determine the correctness of the data from the token.
   * @param {string} token - Token from user request.
   * @returns {Object<boolean, string, string>}.
   */
  let isValid = false;
  const credentials = { };
  const artifacts = { };
  const data = await decodeTokenJwt(token);
  if (data) {
    const session = await Session.findOne({
      where: { id: data.sessionId, userId: data.userId, },
    });
    if (session === null) {
      return { isValid, credentials, artifacts, };
    }

    isValid = true;
    return { isValid, credentials, artifacts, };
  }

  return { isValid, credentials, artifacts, };
}
