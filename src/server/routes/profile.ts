import { schemaStudent, schemaTeacher, schemaProfileChangeInfo, } from '../schemes';
import { studentReg, teacherReg, profileChangeInfo, } from '../api/profile';

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
  },
  {
    method: 'PATCH',
    path: '/profile/{profileId}',
    options: {
      validate: {
        payload: schemaProfileChangeInfo,
      },
    },
    handler: profileChangeInfo,
  }
];
