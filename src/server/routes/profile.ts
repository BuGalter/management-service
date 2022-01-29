import { schemaStudent, schemaTeacher, } from '../schemes';
import { studentReg, teacherReg, } from '../api/profile';

export default [
  {
    method: 'POST',
    path: '/profile/student/reg',
    options: {
      validate: {
        payload: schemaStudent,
      },
    },
    handler: studentReg,
  },
  {
    method: 'POST',
    path: '/profile/teacher/reg',
    options: {
      validate: {
        payload: schemaTeacher,
      },
    },
    handler: teacherReg,
  }
];
