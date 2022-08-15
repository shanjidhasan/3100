var BASE_URL, MAT_URL;

if (process.env.NODE_ENV === "development") {
	BASE_URL = "http://localhost:8000/api";
	MAT_URL = "http://localhost:8000/static/";
} else if (process.env.NODE_ENV === "production") {
	BASE_URL = "https://www.ishkool.org/backend/api";
	MAT_URL = "https://www.ishkool.org/backend/static/";
}

export { BASE_URL, MAT_URL };

// AUTH
export const AUTH_URL = BASE_URL + "/auth";
export const LOGIN_URL = AUTH_URL + "/login";
export const SIGNUP_URL = AUTH_URL + "/signup";
export const VERIFICATION_URL = AUTH_URL + "/verification";
export const RESEND_OTP_URL = AUTH_URL + "/resend_otp";
export const SOCIAL_SIGNUP_URL = AUTH_URL + "/social_signup";
export const GET_RESET_PASSWORD_CODE_URL =
	AUTH_URL + "/resend_otp";
export const VERIFY_RESET_PASSWORD_URL =
	AUTH_URL + "/verification";
export const RESET_PASSWORD_URL = AUTH_URL + "/reset_password";
export const CHANGE_PASSWORD_URL = AUTH_URL + "/change_password";

// EXAM
export const EXAM_URL = BASE_URL + "/exam";
export const GET_ALL_EXAMS_URL = EXAM_URL + "/get_all_exams";
export const CREATE_EXAM_URL = EXAM_URL + "/create_exam";
export const GET_FORM_DATA_URL = EXAM_URL + "/get_form_data";
export const GET_FORM_PREVIEW_DATA_URL = EXAM_URL + "/get_form_preview_data";
export const UPDATE_FORM_INFO_URL = EXAM_URL + "/update_form_info";
export const CREATE_QUESTION_URL = EXAM_URL + "/create_question";
export const UPDATE_QUESTION_URL = EXAM_URL + "/update_question";
export const DELETE_QUESTION_URL = EXAM_URL + "/delete_question";
export const LAUNCH_EXAM_URL = EXAM_URL + "/launch_exam";
export const GET_ALL_RESPONSES_BY_EXAM_ID_URL = EXAM_URL + "/get_all_responses_by_exam_id";
export const GET_FORM_RESPONSE_BY_EXAM_ID_AND_STUDENT_ID_URL = EXAM_URL + "/get_form_response_data_by_exam_id_and_student_id";
export const GET_ALL_RESPONSES_BY_STUDENT_ID_URL = EXAM_URL + "/get_all_responses_by_student_id";
export const GET_UUID_BY_SUBUUID = EXAM_URL + "/getUUID";
export const SUBMIT_FORM = EXAM_URL + "/submitform";



// User
export const USER_URL = BASE_URL + "/user";
export const GET_USER_DETAILS_BY_USERNAME_URL =
	USER_URL + "/get_user_details_by_username";
export const GET_USER_DETAILS_BY_USER_ID_URL =
	USER_URL + "/get_user_details_by_user_id";
export const UPDATE_USER_URL = USER_URL + "/update_user";
export const UPDATE_PASSWORD_URL = USER_URL + "/update_password";
