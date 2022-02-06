import * as Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import { init, } from '../src/server/index';
import { testStudent, testTeacher, } from './test-data';

const lab = Lab.script();
const { describe, it, before, after } = lab;
export { lab };

let gradeId = '';
const GRADE = '4';
const lesson = 'programming';

describe('Student registration POST /api/user/reg', () => {
  let server;
  const student = {
    name: testStudent.name,
    email: testStudent.email,
    password: testStudent.password,
    phone: testStudent.phone,
    birth: testStudent.birth,
    sex: testStudent.sex
  };
  
  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });
   
  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'post',
        url: '/api/user/reg',
        payload: student
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Student auth POST /api/user/auth', () => {
  let server;
  const userStudent = {
    name: testStudent.name,
    password: testStudent.password
  };

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'post',
        url: '/api/user/auth',
        payload: userStudent
    });
    const data = JSON.parse(res.payload);
    testStudent.token = data.result.token;
    testStudent.userId = data.result.userId;
    expect(res.statusCode).to.equal(200);
  });
});

describe('Teacher registration POST /api/user/reg', () => {
  let server;
  const teacher = {
    name: testTeacher.name,
    email: testTeacher.email,
    password: testTeacher.password,
    phone: testTeacher.phone,
    birth: testTeacher.birth,
    sex: testTeacher.sex
  };
  
  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });
   
  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'post',
        url: '/api/user/reg',
        payload: teacher
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Teacher auth POST /api/user/auth', () => {
  let server;
  const userTeacher = {
    name: testTeacher.name,
    password: testTeacher.password
  };

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'post',
        url: '/api/user/auth',
        payload: userTeacher
    });
    const data = JSON.parse(res.payload);
    testTeacher.token = data.result.token;
    testTeacher.userId = data.result.userId;
    expect(res.statusCode).to.equal(200);
  });
});

describe('Student change info user PATCH /api/user/userId', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'patch',
        headers: { 'Authorization' : 'Bearer ' + testStudent.token },
        url: `/api/user/${ testStudent.userId }`,
        payload: {
          sex: testStudent.sex
        }
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Registration us student POST /api/profile/student/reg', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const userStudent = {
      userId: testStudent.userId,
      faculty: testStudent.faculty,
      universityId: testStudent.universityId,
      group: testStudent.group
    };
    const res = await server.inject({
        method: 'post',
        headers: { 'Authorization' : 'Bearer ' + testStudent.token },
        url: '/api/profile/student/reg',
        payload: userStudent
    });
    const data = JSON.parse(res.payload);
    const parseData = data.result.message.split(' ');
    testStudent.studentId = parseData[1];
    expect(res.statusCode).to.equal(200);
  });
});

describe('Registration us teacher POST /api/profile/teacher/reg', () => {
  let server;
  
  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const userTeacher = {
      userId: testTeacher.userId,
      faculty: testTeacher.faculty,
      universityId: testTeacher.universityId,
    };
    const res = await server.inject({
        method: 'post',
        headers: { 'Authorization' : 'Bearer ' + testTeacher.token },
        url: '/api/profile/teacher/reg',
        payload: userTeacher
    });
    const data = JSON.parse(res.payload);
    const parseData = data.result.message.split(' ');
    testTeacher.teacherId = parseData[1];
    expect(res.statusCode).to.equal(200);
  });
});

describe('Teacher change info PATCH /api/profile/profileId', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'patch',
        headers: { 'Authorization' : 'Bearer ' + testTeacher.token },
        url: `/api/profile/${ testTeacher.teacherId }`,
        payload: {
          faculty: testTeacher.faculty
        }
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Create grade POST /api/grade/create', () => {
  let server;
  
  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const grade = {
      studentId: testStudent.studentId,
      teacherId: testTeacher.teacherId,
      grade: +GRADE,
      lesson: lesson,
    };
    const res = await server.inject({
        method: 'post',
        headers: { 'Authorization' : 'Bearer ' + testTeacher.token },
        url: '/api/grade/create',
        payload: grade
    });
    const data = JSON.parse(res.payload);
    gradeId = data.result.grade.id;
    expect(res.statusCode).to.equal(200);
  });
});

describe('Grade change PATCH /api/grade/{gradeId}', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const gradeChange = {
      teacherId: testTeacher.teacherId,
      grade: GRADE
    };
    const res = await server.inject({
        method: 'patch',
        headers: { 'Authorization' : 'Bearer ' + testTeacher.token },
        url: `/api/grade/${ gradeId }`,
        payload: gradeChange
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Avarage student grade GET /api/grade/student/{studentId}&{teacherId?}', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'get',
        headers: { 'Authorization' : 'Bearer ' + testTeacher.token },
        url: `/api/grade/student/${ testStudent.studentId }&${testTeacher.teacherId}`,
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Avarage faculty grade GET /api/grade/faculty/{faculty}&{universityId}', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'get',
        headers: { 'Authorization' : 'Bearer ' + testTeacher.token },
        url: `/api/grade/faculty/${testTeacher.faculty}&${testTeacher.universityId}`,
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Avarage group grade GET /api/grade/group/{group}&{faculty}&{universityId}', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'get',
        headers: { 'Authorization' : 'Bearer ' + testTeacher.token },
        url: `/api/grade/group/${testStudent.group}&${testStudent.faculty}&${testStudent.universityId}`,
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Avarage lesson grade GET /api/grade/lesson/avarage/student/{lesson}', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'get',
        headers: { 'Authorization' : 'Bearer ' + testStudent.token },
        url: `/api/grade/lesson/avarage/student/${lesson}`,
    });
    expect(res.statusCode).to.equal(200);
  });
});

describe('Lesson grades GET /api/grade/lesson/student/{lesson}', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
        method: 'get',
        headers: { 'Authorization' : 'Bearer ' + testStudent.token },
        url: `/api/grade/lesson/student/${lesson}`,
    });
    expect(res.statusCode).to.equal(200);
  });
});
