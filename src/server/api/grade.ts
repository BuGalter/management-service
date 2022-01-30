import { Grade, } from '../models/Grade';
import { Student, } from '../models/Student';
import { Teacher, } from '../models/Teacher';
import { error, output, } from '../utils';

export async function gradeCreate(r) {
  const { studentId, teacherId, grade, lesson, } = r.payload;
  const student = await Student.findByPk(studentId);
  if (!student) {
    return error(404000, `Student not found!`, null);
  }

  const teacher = await Teacher.findByPk(teacherId);
  if (!teacher) {
    return error(404000, `Teacher not found!`, null);
  }

  if (student.faculty === teacher.faculty) {
    if (student.universityId === teacher.universityId) {
      const newGrade = await Grade.create({ studentId, teacherId, grade, lesson, });
      return output({ message: `Grade added student ${student.id}!`, grade: newGrade, });
    }

    return error(400000, `This teacher can't grade!`, null);
  }

  return error(400000, `This teacher can't grade!`, null);
}
