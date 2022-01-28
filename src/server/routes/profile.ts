import { schemaStudent, schemaTeacher, } from '../schemes';
import { studentReg, teacherReg, } from '../api/profile';

export default [
  {
    method: 'POST',
    path: '/profile/regstudent',
    options: {
      validate: {
        payload: schemaStudent,
      },
    },
    handler: studentReg,
  },
  {
    method: 'POST',
    path: '/profile/regteacher',
    options: {
      validate: {
        payload: schemaTeacher,
      },
    },
    handler: teacherReg,
  }
];
