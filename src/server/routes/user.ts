import { ok, } from 'assert';
import { User, } from '../models/User';

export default [
  {
    method: 'GET',
    path: '/user',
    handler: async function (request, h) {

      const users = await User.findAll();
      console.log(users);
      return {status : ok, message: users};
    },
  }
];
