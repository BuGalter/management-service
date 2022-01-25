import { schemaUser, schemaAuth, } from '../schemes';

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
