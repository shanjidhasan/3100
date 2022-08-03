import axios from "axios";
import { DELETE_CHAPTER_MATERIALS_URL } from "../utils/urls";

export const deleteMaterial = (data) => {
	return axios({
		method: "delete",
		url: DELETE_CHAPTER_MATERIALS_URL + `/${data.materialId}`,
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": data.token,
		},
	});
};
