import axios from "axios";
import {
	UPDATE_USER_URL,
	UPDATE_PASSWORD_URL,
	GET_USER_DETAILS_BY_USERNAME_URL,
	GET_USER_DETAILS_BY_USER_ID_URL,
} from "../utils/urls";

export const getUserDetailsByUsername = (data) => {
	return axios({
		method: "post",
		url: GET_USER_DETAILS_BY_USERNAME_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const getUserDetailsByUserId = (data) => {
	return axios({
		method: "post",
		url: GET_USER_DETAILS_BY_USER_ID_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: data,
	});
};

export const updateUser = (data) => {
	return axios({
		method: "patch",
		url: UPDATE_USER_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: {
			userId: data.userId,
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
			bloodGroup: data.bloodGroup,
			dateOfBirth: data.dateOfBirth,
			profession: data.profession,
			address: data.address,
		},
	});
};

export const updatePassword = (data) => {
	console.log(data);
	return axios({
		method: "patch",
		url: UPDATE_PASSWORD_URL,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
		data: {
			userId: data.userId,
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
			confirmPassword: data.confirmPassword,
		},
	});
};
