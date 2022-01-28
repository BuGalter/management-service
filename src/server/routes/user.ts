import { schemaUser, schemaAuth, } from '../schemes';
import { userAuth, userReg, } from '../api/user';

export default [
  {
    method: 'POST',
    path: '/user/reg',
    options: {
      validate: {
        payload: schemaUser,
      },
      auth: false,
    },
    handler: userReg,
  },
  {
    method: 'POST',
    path: '/user/auth',
    options: {
      validate: {
        payload: schemaAuth,
      },
      auth: false,
    },
    handler: userAuth,
  }
];
