export default [
  {
    method: 'POST',
    path: '/user/reg',
    options: {
      auth: false,
    },
    handler: userReg,
  },
  {
    method: 'POST',
    path: '/user/auth',
    options: {
      auth: false,
    },
    handler: userAuth,
  }
];
