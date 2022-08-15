const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Exam = require("../models/exam.model");
const Material = require("../models/material.model");
const Question = require("../models/question.model");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const { isUserValid, isUserActive, isUserVerified } = require("./utils");
const { Op } = require("sequelize");
const Answer = require("../models/answer.model");
const { response } = require("express");

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

		exam.dataValues.questions = questions;

		return exam;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

exports.getFormPreviewData = async (params, userId) => {
	try {
		const { uuid } = params;

		const exam = await Exam.findOne({
			where: {
				uuid: uuid,
			},
		});
		if (!exam) {
			throw new Error("Exam not found");
		}
		// if (
		// 	exam.created_by != userId
		// ) {
		// 	throw new Error("You are not authorized to view this exam");
		// }

		console.log("Here");
		const questions = await Question.findAll({
			where: {
				exam_id: exam.id,
				is_active: true,
			},
			order: [["id", "ASC"]],
		});

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

		await question.save();

		question.dataValues.exam = exam;

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
		if (question.is_active) {
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
		return { questions, total_marks: exam.total_marks };
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
exports.submitForm = async (data, userId) => {
	const prev = await Answer.findOne({
		where: {
			exam_id: data.exam_id,
			answered_by: userId,
		},
	});
	if (prev) {
		throw new Error("Already submitted once");
	}
	var obtained_marks = 0;
	var answers = [];
	for (let i = 0; i < data.answer.length; i++) {
		var q_id = data.answer[i].q_id;
		var answer = data.answer[i].answer;
		var marks = 0;
		console.log(data.answer[i].q_id);
		var question = await Question.findOne({
			where: {
				id: data.answer[i].q_id,
			},
		});
		if (question.type === "text") {
			if (data.answer[i].answer.toLowerCase() === question.answer.toLowerCase()) {
				obtained_marks += question.marks;
				marks = question.marks;
			}
		} else {
			var correct_answers = JSON.stringify(question.answer_options)
			var given_answers = JSON.stringify(data.answer[i].answer.split(","))
			if (correct_answers === given_answers) {
				obtained_marks += question.marks;
				marks = question.marks;
			}
		}
		answers.push({ "q_id": q_id, "answer": answer, "marks": marks });
	}
	var student_answer = await Answer.create({
		uuid: uuidv4(),
		answered_by: userId,
		exam_id: data.exam_id,
		obtained_marks: obtained_marks,
		answer: answers,
	});
	return student_answer;
};
exports.get_form_response_data_by_exam_id_and_student_id = async (data, userId) => {
	console.log(data)
	const exam = await Exam.findOne({
		where: {
			uuid: data.exam_id,
		}
	});
	if (!exam) {
		throw new Error("Exam not found");
	}
	var answers = await Answer.findOne({
		where: {
			exam_id: exam.id,
			answered_by: data.student_id,
		},
	});
	if (!answers) {
		throw new Error("Answer not found");
	}

	const student = await User.findOne({
		where: {
			id: data.student_id,
		}
	});
	if (!student) {
		throw new Error("Student not found");
	}

	var processed_answers = [];
	for (let i = 0; i < answers.answer.length; i++) {
		processed_answers.push(JSON.parse(answers.answer[i]));
	}

	const questions = await Question.findAll({
		where: {
			exam_id: exam.id,
		},
		order: [["id", "ASC"]],
	});

	for (let i = 0; i < questions.length; i++) {
		const question = questions[i];
		for (let j = 0; j < processed_answers.length; j++) {
			if (processed_answers[j].q_id === question.id) {
				if (question.type === "text") {
					question.dataValues.student_answer = processed_answers[j].answer;
				} else {
					question.dataValues.student_answer = processed_answers[j].answer.split(",");
				}
				question.dataValues.ob_marks = processed_answers[j].marks;
			}
		}
	}

	exam.dataValues.questions = questions;
	exam.dataValues.student = student;
	exam.dataValues.obtained_marks = answers.obtained_marks;

	console.log({ exam })

	return exam;
};

exports.get_all_responses_by_exam_id = async (data) => {
	const { uuid } = data;
	const exam = await Exam.findOne({
		where: {
			uuid: uuid,
		}
	});
	if (!exam) {
		throw new Error("Exam not found");
	}
	var responses = await Answer.findAll({
		where: {
			exam_id: exam.id,
		},
		include: [{
			model: Exam,
			as: "exam",
		}, {
			model: User,
			as: "student",
			attributes: ["id", "username", "email", "first_name", "last_name"],
		}
		],
	});
	console.log("Res: " + responses);
	return responses;
};

exports.get_all_responses_by_student_id = async (userId) => {
	var responses = await Answer.findAll({
		where: {
			answered_by: userId,
		},
		include: [{
			model: Exam,
			as: "exam",
		}, {
			model: User,
			as: "student",
			attributes: ["id", "username", "email", "first_name", "last_name"],
		}
		],
	});
	res_exams = [];
	for (let i = 0; i < responses.length; i++) {
		const response = responses[i];
		const exam = response.exam;
		res_exams.push(exam);
	}
	console.log("Res: " + responses);
	return res_exams;
};
exports.getUUID = async (params, userId) => {

	
    const { subUUID } = params;

    console.log("hereeeeee" + subUUID)

    var temp = subUUID + "%"

    var exam = await Exam.findOne({

        where: {

            uuid: {
				[Op.like]: temp
			}
        },

    });
	if(!exam){
		throw new Error("Exam not found");
	}
	const prev = await Answer.findOne({
		where: {
			exam_id: exam.id,
			answered_by: userId,
		}
	});
	if (prev) {
		throw new Error("Already submitted once"); 
	}

    return {"uuid": exam.uuid};

};