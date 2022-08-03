import axios from "axios";
import {
	LOGIN_URL,
	SIGNUP_URL,
	VERIFICATION_URL,
	RESEND_OTP_URL,
	SOCIAL_SIGNUP_URL,
	GET_RESET_PASSWORD_CODE_URL,
	RESET_PASSWORD_URL,
	VERIFY_RESET_PASSWORD_URL,
} from "../utils/urls";

export const signUpUser = (user_data) => {
	return axios.post(SIGNUP_URL, user_data);
};

export const verifyUser = (user_data) => {
	return axios.post(VERIFICATION_URL, user_data);
};

export const resendOTP = (data) => {
	return axios.post(RESEND_OTP_URL, data);
};

export const loginUser = (user_data) => {
	return axios.post(LOGIN_URL, user_data);
};

export const socialSignUp = (user_data) => {
	return axios.post(SOCIAL_SIGNUP_URL, user_data);
};

export const getResetPasswordCode = (data) => {
	console.log(data);
	return axios.post(GET_RESET_PASSWORD_CODE_URL, data);
};

export const verifyResetPasswordCode = (data) => {
	console.log(data);
	return axios.post(VERIFY_RESET_PASSWORD_URL, data);
};

export const resetPassword = (data) => {
	return axios.post(RESET_PASSWORD_URL, data);
};
