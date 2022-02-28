import { schemaUser, schemaAuth, schemaUserChangeInfo, } from '../schemes';
import { userAuth, userReg, userChangeInfo, } from '../api/user';

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
  },
  {
    method: 'PATCH',
    path: '/user/{userId}',
    options: {
      validate: {
        payload: schemaUserChangeInfo,
      },
    },
    handler: userChangeInfo,
  }
];
