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

export async function gradeChange(r) {
  const { teacherId, grade, } = r.payload;
  const prevGrade = await Grade.findByPk(r.params.gradeId);
  if (!prevGrade) {
    return error(404000, `Grade not found!`, null);
  }

  if (prevGrade.teacherId === teacherId) {
    await prevGrade.update({ grade, });
    const newGrade = await Grade.findByPk(r.params.gradeId);
    return output({ message: `Grade update!`, newGrade, });
  }

  return error(400000, `This teacher can't change grade!`, null);
}

async function getAvarageGradeStudent(studentId) {
  const gradesCount = await Grade.count({
    where: {
      studentId,
    },
  });
  const gradesSum = await Grade.sum('grade', {
    where: {
      studentId,
    },
  });

  return (gradesSum / gradesCount);
}

export async function studentAverageGrade(r) {
  if (r.params.teacherId) {
    const teacher = await Teacher.findByPk(r.params.teacherId);
    if (!teacher) {
      return error(404000, `Teacher not found!`, null);
    }

    const student = await Student.findByPk(r.params.studentId);
    if (student.faculty !== teacher.faculty
      || student.universityId !== teacher.universityId) {
      return error(400000, `This teacher can't watch grades!`, null);
    }

    const avarageGrade = await getAvarageGradeStudent(r.params.studentId);
    return output({ avarageGrade, });
  }

  const avarageGrade = await getAvarageGradeStudent(r.params.studentId);
  return output({ avarageGrade, });
}

async function getFacultyAvaregeGrade(teacherId) {
  const gradesCount = await Grade.count({
    where: {
      teacherId,
    },
  });
  const gradesSum = await Grade.sum('grade', {
    where: {
      teacherId,
    },
  });
  return gradesSum / gradesCount;
}

export async function facultyAverageGrade(r) {
  const { faculty, universityId, teacherId, } = r.params;
  const teacher = await Teacher.findOne({
    where: {
      id: teacherId,
      faculty,
      universityId,
    },
  });
  if (!teacher) {
    return error(404000, `Faculty grades for teacher not found!`, null);
  }

  const result = await getFacultyAvaregeGrade(teacher.id);
  if (!result) {
    return error(404000, `Grades not found!`, null);
  }

  return output({ avarageGrade: result, });
}