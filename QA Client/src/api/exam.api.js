import axios from "axios";
import {
	CREATE_EXAM_URL,
	CREATE_QUESTION_URL,
	DELETE_QUESTION_URL,
	GET_ALL_EXAMS_URL,
	GET_FORM_DATA_URL,
	GET_FORM_PREVIEW_DATA_URL,
	LAUNCH_EXAM_URL,
	UPDATE_FORM_INFO_URL,
	GET_ALL_RESPONSES_BY_EXAM_ID_URL,
	GET_FORM_RESPONSE_BY_EXAM_ID_AND_STUDENT_ID_URL,
	GET_ALL_RESPONSES_BY_STUDENT_ID_URL,
	GET_UUID_BY_SUBUUID,
	SUBMIT_FORM,
} from "../utils/urls";

export const getAllExams = async (data) => {
	return axios({
		method: "get",
		url: GET_ALL_EXAMS_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
	});
};


export const createExam = async (data) => {
	return axios({
		method: "post",
		url: CREATE_EXAM_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const getFormData = async (data) => {
	return axios({
		method: "post",
		url: GET_FORM_DATA_URL + "/" + data.uuid,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const getFormPreviewData = async (data) => {
	return axios({
		method: "get",
		url: GET_FORM_PREVIEW_DATA_URL + "/" + data.uuid,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
	});
};

export const updateFormInfo = async (data) => {
	return axios({
		method: "put",
		url: UPDATE_FORM_INFO_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const createQuestion = async (data) => {
	return axios({
		method: "post",
		url: CREATE_QUESTION_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const deleteQuestion = async (data) => {
	return axios({
		method: "delete",
		url: DELETE_QUESTION_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const launchExam = async (data) => {
	console.log(data);
	return axios({
		method: "post",
		url: LAUNCH_EXAM_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const get_all_responses_by_exam_id = async (data) => {
	console.log(data);
	return axios({
		method: "get",
		url: GET_ALL_RESPONSES_BY_EXAM_ID_URL + '/' + data.uuid,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
	});
};

export const get_form_response_data_by_exam_id_and_student_id = async (data) => {
	console.log(data);
	return axios({
		method: "post",
		url: GET_FORM_RESPONSE_BY_EXAM_ID_AND_STUDENT_ID_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};
export const get_all_responses_by_student_id = async (data) => {
	console.log(data);
	return axios({
		method: "get",
		url: GET_ALL_RESPONSES_BY_STUDENT_ID_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
	});
};
export const getUUID = async (data) => {
	console.log(data);
	return axios({
		method: "get",
		url: GET_UUID_BY_SUBUUID + '/' + data.sub_uuid,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
	});
};
export const submitform = async (data) => {
	console.log(data);
	return axios({
		method: "post",
		url: SUBMIT_FORM,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};


