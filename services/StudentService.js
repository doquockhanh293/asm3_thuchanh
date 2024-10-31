const Student = require("../models/Student");

//dữ liệu trả về khi được create in post
const createStudent = (fullName, studentCode, isActive) => {
  return new Promise(async (resolve, reject) => {
    const newStudent = new Student({ fullName, studentCode, isActive });
    try {
      const student = await newStudent.save();
      const result = {
        _id: student._id,
        name: student.fullName,
        studentCode: student.studentCode,
        isActive: student.isActive,
      };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

//dữ liệu trả về khi get tất cả students đc tạo
const getAllStudent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allStudents = await Student.find();
      if (Array.isArray(allStudents)) {
        const result = allStudents.map((student) => ({
          _id: student._id,
          name: student.fullName,
          studentCode: student.studentCode,
          isActive: student.isActive,
        }));
        return resolve(result);
      }
      const result = {
        _id: allStudents._id,
        name: allStudents.fullName,
        studentCode: allStudents.studentCode,
        isActive: allStudents.isActive,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createStudent,
  getAllStudent,
  // getStudentById,
  // updateStudent,
  // deleteStudent,
};
