const Student = require("../models/Student");
const StudentService = require("../services/StudentService");

const dataStudent = async (req, res) => {
  return res.status(200).json({
    data: {
      fullName: "Đỗ Quốc Khánh",
      studentCode: "QE170058",
    },
  });
};

module.exports = {
  dataStudent,
  //   createStudent,
  //   getAllStudent,
  //   getStudentById,
  //   updateStudent,
  //   deleteStudent,
};
