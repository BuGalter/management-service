import { gradeCreate, gradeChange, } from '../api/grade';
import { schemaChangeGrade, shemaGrade, } from '../schemes';

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
  },
  {
    method: 'PATCH',
    path: '/grade/{gradeId}',
    options: {
      validate: {
        payload: schemaChangeGrade,
      },
    },
    handler: gradeChange,
  }
];
