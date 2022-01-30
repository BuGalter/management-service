import { gradeCreate, } from '../api/grade';
import { shemaGrade, } from '../schemes';

export default [
  {
    method: 'POST',
    path: '/grade/create',
    options: {
      validate: {
        payload: shemaGrade,
      },
    },
    handler: gradeCreate,
  }
];
