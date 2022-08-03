const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
	getAllExams,
	createExam,
	getFormDataByUuid,
	updateFormInfo,
	createQuestion,
	updateQuestion,
	deleteQuestion,
	deleteExam,
	launchExam,
	deactivateExamByTeacher,
} = require("../controllers/exam.controller");
const router = express.Router();

const multer = require("multer");
var fs = require("fs");
const authorizeVerifiedUser = require("../middleware/authorizeVerifiedUser");

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		if (!fs.existsSync("public/materials/class")) {
			fs.mkdirSync("public/materials/class", { recursive: true });
		}
		cb(null, "public/materials/class");
	},
	filename: (req, file, cb) => {
		cb(null, uuidv4() + "--" + file.originalname);
	},
});
const upload = multer({ storage: fileStorageEngine });

router.get("/get_all_exams", authorizeVerifiedUser, getAllExams);
router.post("/create_exam", authorizeVerifiedUser, createExam);
router.post("/get_form_data/:uuid", authorizeVerifiedUser, getFormDataByUuid);
router.put("/update_form_info", updateFormInfo);
router.delete("/delete_exam", deleteExam);
router.post("/launch_exam", authorizeVerifiedUser, launchExam);
router.post(
	"/deactivate_exam_by_teacher",
	authorizeVerifiedUser,
	deactivateExamByTeacher
);
router.post("/create_question", createQuestion);
router.put(
	"/update_question",
	upload.fields([
		{
			name: "questionFile",
			maxCount: 1,
		},
		{
			name: "questionAnswerFile",
			maxCount: 1,
		},
	]),
	updateQuestion
);
router.delete("/delete_question", deleteQuestion);

module.exports = router;
