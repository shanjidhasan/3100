const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Exam = require("../models/exam.model");
const Material = require("../models/material.model");
const Question = require("../models/question.model");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const { isUserValid, isUserActive, isUserVerified } = require("./utils");
const { Op } = require("sequelize");

exports.getAllExams = async (userId) => {
	console.log(userId);
	try {
		const exams = await Exam.findAll({
			where: {
				created_by: userId,
			},
			order: [["updated_at", "DESC"]],
			include: [
				
				{
					model: Question,
					as: "questions",
				},
			],
		});
		return exams;
	} catch (error) {
		throw new Error(error);
	}
};

exports.createExam = async (data, userId) => {
	console.log(data);
	console.log(userId);

	const user = await User.findOne({
		where: {
			id: userId,
		},
		include: [
			{
				model: Role,
				as: "role",
				attributes: [
					"is_student",
					"is_teacher",
					"is_guardian",
					"is_admin",
					"is_superadmin",
				],
			},
		],
	});
	isUserValid(user);
	isUserActive(user);
	isUserVerified(user);

	const exam = await Exam.create({
		uuid: uuidv4(),
		title: "Default Title",
		details: "Default Description",
		topic: "Default Topic",
		created_by: userId,
	});

	console.log("exam created");
	return exam;
};

exports.getFormDataByUuid = async (params, data, userId) => {
	try {
		const { uuid } = params;
		console.log(params);
		const { edit, preview } = data;
		console.log(edit, preview);

		const exam = await Exam.findOne({
			where: {
				uuid: uuid,
			},
		});
		if (!exam) {
			throw new Error("Exam not found");
		}
		if (
			exam.created_by != userId &&
			edit === true &&
			preview === false
		) {
			throw new Error("You are not authorized to view this exam");
		}

		console.log("Here");
		const questions = await Question.findAll({
			where: {
				exam_id: exam.id,
			},
			order: [["id", "ASC"]],
		});

		for (let i = 0; i < questions.length; i++) {
			const question = questions[i];
			if (question.question_material_id) {
				const material = await Material.findOne({
					where: {
						id: question.question_material_id,
					},
				});
				question.dataValues.question_material = material;
			}
			if (question.answer_material_id) {
				const answer_material = await Material.findOne({
					where: {
						id: question.answer_material_id,
					},
				});
				question.dataValues.answer_material = answer_material;
			}
		}

		exam.dataValues.questions = questions;

		return exam;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.updateFormInfo = async (data) => {
	try {
		console.log(data);
		const { uuid, title, description, dueDateTime, passMarks } = data;

		var exam = await Exam.findOne({
			where: {
				uuid: uuid,
			},
		});
		if (!exam) {
			throw new Error("Exam not found");
		}
		if (title) {
			exam.title = title;
		}
		if (description) {
			exam.details = description;
		}
		if (dueDateTime) {
			exam.due_date_time = new Date(dueDateTime);
		}
		if (passMarks) {
			exam.pass_marks = passMarks;
		}
		await exam.save();

		return exam;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.deleteExam = async (data) => {
	try {
		const { uuid } = data;

		const exam = await Exam.findOne({
			where: {
				uuid: uuid,
			},
		});
		if (!exam) {
			throw new Error("Exam not found");
		}
		exam.destroy();

		const questions = await Question.findAll({
			where: {
				exam_id: exam.id,
			},
		});
		for (let i = 0; i < questions.length; i++) {
			const question = questions[i];
			if (question.question_material_id) {
				const material = await Material.findOne({
					where: {
						id: question.question_material_id,
					},
				});
				await material.destroy();
			}
			if (question.answer_material_id) {
				const material = await Material.findOne({
					where: {
						id: question.answer_material_id,
					},
				});
				await material.destroy();
			}
			await question.destroy();
		}

		return exam;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.launchExam = async (data) => {
	try {
		console.log(data);
		const { examId, userId, minutes } = data;
		if (!examId) {
			throw new Error("Exam ID is required");
		}
		if (!userId) {
			throw new Error("User ID is required");
		}
		if (!minutes) {
			throw new Error("Minutes is required");
		}
		const intMins = parseInt(minutes);
		if (intMins < 0) {
			throw new Error("Minutes must be greater than 0");
		}

		var exam = await Exam.findOne({
			where: {
				id: examId,
			},
		});
		if (!exam) {
			throw new Error("Exam not found");
		}

		const user = await User.findOne({
			where: {
				id: userId,
			},
			include: [
				{
					model: Role,
					as: "role",
					attributes: [
						"is_student",
						"is_teacher",
						"is_guardian",
						"is_admin",
						"is_superadmin",
					],
				},
			],
		});
		isUserValid(user);
		isUserActive(user);
		isUserVerified(user);

		var date = new Date(Date.now());
		// add 6 hours to the date
		// date.setHours(date.getHours() + 6);
		// add the minutes to the date
		date.setMinutes(date.getMinutes() + intMins);
		console.log(date);

		exam.due_date_time = date;
		exam.is_started = true;
		await exam.save();

		return exam;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.deactivateExamByTeacher = async (data) => {
	try {
		console.log(data);
		const { examId } = data;
		if (!examId) {
			throw new Error("Exam ID is required");
		}

		var exam = await Exam.findOne({
			where: {
				id: examId,
			},
		});
		if (!exam) {
			throw new Error("Exam not found");
		}

		exam.is_active = false;
		await exam.save();

		return exam;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.createQuestion = async (data) => {
	try {
		console.log(data);
		const { examId } = data;

		const question = await Question.create({
			uuid: uuidv4(),
			exam_id: examId,
		});

		return question;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.updateQuestion = async (data, files) => {
	try {
		const {
			userId,
			examUUID,
			questionId,
			questionText,
			questionType,
			questionDescription,
			questionMarks,
			questionAnswer,
			questionOptions,
			questionAnswerOptions,
			questionVisible,
			questionRequired,
			questionMaterialCleared,
			questionAnswerMaterialCleared,
		} = data;
		console.log(data);
		console.log(files);

		if (!questionId) {
			throw new Error("Question ID is required");
		}
		if (!userId) {
			throw new Error("User ID is required");
		}

		var question = await Question.findOne({
			where: {
				id: questionId,
			},
			include: [
				{
					model: Exam,
					as: "exam",
				},
			],
		});
		if (!question) {
			throw new Error("Question not found");
		}

		const exam = await Exam.findOne({
			where: {
				uuid: examUUID,
			},
		});
		if (!exam) {
			throw new Error("Exam not found");
		}

		var question_material;
		if (question.question_material_id) {
			question_material = await Material.findOne({
				where: {
					id: question.question_material_id,
				},
			});
		}

		var answer_material;
		if (question.answer_material_id) {
			answer_material = await Material.findOne({
				where: {
					id: question.answer_material_id,
				},
			});
		}

		question.question_text = questionText || "";
		question.type = questionType;
		question.description = questionDescription || "";

		if (question.is_active) {
			var intMarks = parseFloat(questionMarks);
			if (isNaN(intMarks) || intMarks < 0) {
				intMarks = 0;
			}
			exam.total_marks = exam.total_marks + (intMarks - question.marks);
			question.marks = intMarks;
		}

		question.answer = questionAnswer || "";
		if (questionOptions) {
			const options = questionOptions.split(",");
			question.options = options;
		}
		if (questionAnswerOptions) {
			const answerOptions = questionAnswerOptions.split(",");
			question.answer_options = answerOptions;
		}

		const prevState = [question.is_active, questionVisible];
		question.is_active = questionVisible;
		const currState = [question.is_active, questionVisible];
		if (prevState[0] !== currState[0]) {
			if (prevState[0] === false) {
				var marks = parseFloat(question.marks);
				if (isNaN(marks) || marks < 0) {
					marks = 0;
				}
				exam.total_marks = exam.total_marks + marks;
			} else if (currState[0] === false) {
				var marks = parseFloat(question.marks);
				if (isNaN(marks) || marks < 0) {
					marks = 0;
				}
				exam.total_marks = exam.total_marks - marks;
			}
		}
		await exam.save();
		// question.is_required = questionRequired;

		if (files.questionFile) {
			const courseData = await Course.findOne({
				where: {
					id: courseId,
					is_active: true,
					is_deleted: false,
				},
				include: [
					{
						model: Subject_x_Class,
						attributes: ["class_id"],
						as: "subject",
					},
				],
			});
			if (courseData == null) {
				throw new Error("course not found");
			}

			const user = await User.findOne({
				where: {
					id: userId,
				},
				include: [
					{
						model: Role,
						as: "role",
						attributes: [
							"is_student",
							"is_teacher",
							"is_guardian",
							"is_admin",
							"is_superadmin",
						],
					},
				],
			});
			isUserValid(user);
			isUserActive(user);
			isUserVerified(user);

			var rootDir = "public/";
			var destination =
				"materials/class/" +
				courseData.subject.class_id +
				"/subject_" +
				courseData.subject_x_class_id +
				"/course_" +
				courseId +
				"/chapter_" +
				chapterId +
				"/files/exams/" +
				examUUID +
				"/";

			var dir = rootDir + destination;
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			fs.rename(
				files.questionFile[0].path,
				dir + "/" + files.questionFile[0].filename,
				function (err) {
					if (err) throw err;
				}
			);

			var question_file_material = await Material.create({
				uuid: uuidv4(),
				title: files.questionFile[0].originalname,
				file_path: destination + "/" + files.questionFile[0].filename,
				file_type: files.questionFile[0].mimetype,
				size: files.questionFile[0].size,
				encoding: files.questionFile[0].encoding,
				uploader_id: userId,
			});

			question.question_material_id = question_file_material.id;
		} else if (questionMaterialCleared === "true") {
			question.question_material_id = null;
		}

		var question_answer_file_material;
		if (files.questionAnswerFile) {
			const courseData = await Course.findOne({
				where: {
					id: courseId,
					is_active: true,
					is_deleted: false,
				},
				include: [
					{
						model: Subject_x_Class,
						attributes: ["class_id"],
						as: "subject",
					},
				],
			});
			if (courseData == null) {
				throw new Error("course not found");
			}

			const user = await User.findOne({
				where: {
					id: userId,
				},
				include: [
					{
						model: Role,
						as: "role",
						attributes: [
							"is_student",
							"is_teacher",
							"is_guardian",
							"is_admin",
							"is_superadmin",
						],
					},
				],
			});
			isUserValid(user);
			isUserActive(user);
			isUserVerified(user);

			var rootDir = "public/";
			var destination =
				"materials/class/" +
				courseData.subject.class_id +
				"/subject_" +
				courseData.subject_x_class_id +
				"/course_" +
				courseId +
				"/chapter_" +
				chapterId +
				"/files/exams/" +
				examUUID +
				"/";

			var dir = rootDir + destination;
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			fs.rename(
				files.questionAnswerFile[0].path,
				dir + "/" + files.questionAnswerFile[0].filename,
				function (err) {
					if (err) throw err;
				}
			);

			question_answer_file_material = await Material.create({
				uuid: uuidv4(),
				title: files.questionAnswerFile[0].originalname,
				file_path:
					destination + "/" + files.questionAnswerFile[0].filename,
				file_type: files.questionAnswerFile[0].mimetype,
				size: files.questionAnswerFile[0].size,
				encoding: files.questionAnswerFile[0].encoding,
				uploader_id: userId,
			});

			question.answer_material_id = question_answer_file_material.id;
		} else if (questionAnswerMaterialCleared === "true") {
			question.answer_material_id = null;
		}

		await question.save();

		question.dataValues.exam = exam;
		question.dataValues.question_material = question_material;
		question.dataValues.answer_material = answer_material;

		return question;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.deleteQuestion = async (data) => {
	try {
		const { questionId } = data;
		if (!questionId) {
			throw new Error("Question ID is required");
		}

		const question = await Question.findOne({
			where: {
				id: questionId,
			},
		});

		if (!question) {
			throw new Error("Question not found");
		}

		if (question.question_material_id) {
			const material = await Material.findOne({
				where: {
					id: question.question_material_id,
				},
			});
			if (material) {
				await material.destroy();
			}
		}
		var exam
		if(question.is_active){
			exam = await Exam.findOne({
				where: {
					id: question.exam_id,
				},
			});
			exam.total_marks -= question.marks;
			await exam.save();
		}

		await question.destroy();

		const questions = await Question.findAll({
			where: {
				exam_id: question.exam_id,
			},
			order: [["id", "ASC"]],
		});

		// for (let i = 0; i < questions.length; i++) {
		// 	const question = questions[i];
		// 	if (question.question_material_id) {
		// 		const material = await Material.findOne({
		// 			where: {
		// 				id: question.question_material_id,
		// 			},
		// 		});
		// 		question.dataValues.question_material = material;
		// 	}
		// 	if (question.answer_material_id) {
		// 		const answer_material = await Material.findOne({
		// 			where: {
		// 				id: question.answer_material_id,
		// 			},
		// 		});
		// 		question.dataValues.answer_material = answer_material;
		// 	}
		// }
		return {questions, total_marks: exam.total_marks};
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
