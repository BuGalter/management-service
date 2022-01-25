import { schemaUser, } from '../schemes';

export async function validatePayload(payload) {
  try {
    const value = await schemaUser.validateAsync(payload);
    return value;
  }
  catch (error) {
    return error.message;
  }
}
