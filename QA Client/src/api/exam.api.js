import axios from "axios";
import {
	CREATE_EXAM_URL,
	CREATE_QUESTION_URL,
	DELETE_QUESTION_URL,
	GET_ALL_EXAMS_URL,
	GET_FORM_DATA_URL,
	LAUNCH_EXAM_URL,
	UPDATE_FORM_INFO_URL,
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
