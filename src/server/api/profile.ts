import { Student, } from '../models/Student';
import { Teacher, } from '../models/Teacher';
import { User, } from '../models/User';
import { output, error, } from '../utils';

async function isUser(userId) {
  const user = await User.findByPk(userId);
  if (!user) {
    return false;
  }

  return true;
}

export async function studentReg(r) {
  const { userId, faculty, universityId, group, } = r.payload;
  if (!isUser(userId)) {
    return error(404000, `User not found!`, null);
  }

  const student = await Student.findOne({
    where: { userId, universityId, },
  });
  if (!student) {
    const newStudent = await Student.create({ userId, faculty, universityId, group, });
    return output({ message: `Student ${newStudent.id} added!`, });
  }

  return error(400000, `Student already exists!`, null);
}

export async function teacherReg(r) {
  const { userId, faculty, universityId, } = r.payload;
  if (!isUser(userId)) {
    return error(404000, `User not found!`, null);
  }

  const teacher = await Teacher.findOne({
    where: { userId, universityId, },
  });
  if (!teacher) {
    const newTeacher = await Teacher.create({ userId, faculty, universityId, });
    return output({ message: `Student ${newTeacher.id} added!`, });
  }

  return error(400000, `Teacher already exists!`, null);
}

export async function profileChangeInfo(r) {
  const { data, } = r.payload;

  const student = await Student.findByPk(r.params.profileId);
  if (student) {
    await student.update(data);
    return output({ message: `Student profile info  update!`, });
  }

  const teacher = await Teacher.findByPk(r.params.profileId);
  if (teacher) {
    await student.update(data);
    return output({ message: `Teacher profile info  update!`, });
  }

  return error(404000, `Profile not found!`, null);
}
