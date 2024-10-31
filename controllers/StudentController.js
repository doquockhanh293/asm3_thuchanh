const Student = require("../models/Student");
const StudentService = require("../services/StudentService");

//add data
const dataStudent = async (req, res) => {
  return res.status(200).json({
    data: {
      fullName: "Đỗ Quốc Khánh",
      studentCode: "QE170058",
    },
  });
};

//create a student in post (/students)
const createStudent = async (req, res) => {
  const { name, studentCode, isActive } = req.body;
  try {
    // Xác thực xem fullName, studentCode và isActive có hiện diện không
    if (!name || !studentCode || typeof isActive === "undefined") {
      return res.status(400).json({
        success: false,
        message: "name, studentCode, and isActive are required",
      });
    }
    const student = await Student.findOne({ studentCode });
    if (student) {
      return res.status(409).json({
        success: false,
        message: "Student code already exists, please try another one",
      });
    }

    const studentCreate = await StudentService.createStudent(
      name,
      studentCode,
      isActive
    );

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: studentCreate,
    });
  } catch (error) {
    // Xử lý lỗi và gửi phản hồi phù hợp
    console.error("Error during student creation:", error);
    res.status(500).json({
      success: false,
      message: "Creation failed due to server error",
    });
  }
};

// get tất cả students được tạo
const getAllStudent = async (req, res) => {
  try {
    const allStudent = await StudentService.getAllStudent();
    return res.status(200).json({
      success: true,
      data: allStudent,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  dataStudent,
  createStudent,
  getAllStudent,
  //   getStudentById,
  //   updateStudent,
  //   deleteStudent,
};
