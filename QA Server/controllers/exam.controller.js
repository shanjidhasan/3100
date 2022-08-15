const ExamService = require("../services/exam.service");

module.exports = {
	getAllExams: async (req, res) => {
		ExamService.getAllExams(res.locals.id)
			.then((response) => {
				return res.status(200).json({
					message: "Successfully fetched all exams",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error fetching information",
					error: err.message,
				});
			});
	},
	createExam: async (req, res) => {
		ExamService.createExam(req.body, res.locals.id)
			.then((response) => {
				return res.status(200).json({
					message: "Exam created successfully",
					data: response,
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: "Error creating exam",
					error: err.message,
				});
			});
	},
	getFormDataByUuid: async (req, res) => {
		ExamService.getFormDataByUuid(req.params, req.body, res.locals.id)
			.then((response) => {
				return res.status(200).json({
					message: "Successfully fetched form data",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error fetching information",
					error: err.message,
				});
			});
	},
	getFormPreviewData: async (req, res) => {
		ExamService.getFormPreviewData(req.params, req.body, res.locals.id)
			.then((response) => {
				return res.status(200).json({
					message: "Successfully fetched form data",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error fetching information",
					error: err.message,
				});
			});
	},
	updateFormInfo: async (req, res) => {
		ExamService.updateFormInfo(req.body)
			.then((response) => {
				return res.status(200).json({
					message: "Form info updated successfully",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error fetching information",
					error: err.message,
				});
			});
	},
	deleteExam: async (req, res) => {
		ExamService.deleteExam(req.body)
			.then((response) => {
				return res.status(200).json({
					message: "Exam deleted successfully",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error deleting exam",
					error: err.message,
				});
			});
	},
	launchExam: async (req, res) => {
		ExamService.launchExam(req.body)
			.then((response) => {
				return res.status(200).json({
					message: "Exam launched successfully",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error launching exam",
					error: err.message,
				});
			});
	},
	deactivateExamByTeacher: async (req, res) => {
		ExamService.deactivateExamByTeacher(req.body)
			.then((response) => {
				return res.status(200).json({
					message: "Exam deactivated successfully",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error deactivating exam",
					error: err.message,
				});
			});
	},
	createQuestion: async (req, res) => {
		ExamService.createQuestion(req.body)
			.then((response) => {
				return res.status(200).json({
					message: "Question created successfully",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error creating question",
					error: err.message,
				});
			});
	},
	updateQuestion: async (req, res) => {
		ExamService.updateQuestion(req.body, req.files)
			.then((response) => {
				return res.status(200).json({
					message: "Question updated successfully",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error updating question",
					error: err.message,
				});
			});
	},
	deleteQuestion: async (req, res) => {
		ExamService.deleteQuestion(req.body)
			.then((response) => {
				return res.status(200).json({
					message: "Question deleted successfully",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error deleting question",
					error: err.message,
				});
			});
	},
	submitForm: async (req, res) => {
		ExamService.submitForm(req.body, res.locals.id)
			.then((response) => {
				return res.status(200).json({
					message: "Exam created successfully",
					data: response,
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: "Error creating exam",
					error: err.message,
				});
			});
	},
	get_form_response_data_by_exam_id_and_student_id: async (req, res) => {
		ExamService.get_form_response_data_by_exam_id_and_student_id(req.body, res.locals.id)
			.then((response) => {
				return res.status(200).json({
					message: "Exam created successfully",
					data: response,
				});
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({
					message: "Error creating exam",
					error: err.message,
				});
			});
	},
	get_all_responses_by_exam_id: async (req, res) => {
		ExamService.get_all_responses_by_exam_id(req.params)
			.then((response) => {
				return res.status(200).json({
					message: "Successfully fetched form data",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error fetching information",
					error: err.message,
				});
			});
	},
	get_all_responses_by_student_id: async (req, res) => {
		ExamService.get_all_responses_by_student_id(res.locals.id)
			.then((response) => {
				return res.status(200).json({
					message: "Successfully fetched form data",
					data: response,
				});
			})
			.catch((err) => {
				res.status(500).json({
					message: "Error fetching information",
					error: err.message,
				});
			});
	},
	getUUID: async (req, res) => {

        ExamService.getUUID(req.params, res.locals.id)

            .then((response) => {

                return res.status(200).json({

                    message: "Successfully fetched form data",

                    data: response,

                });

            })

            .catch((err) => {

                res.status(500).json({

                    message: "Error fetching information",

                    error: err.message,

                });

            });

    },
};
