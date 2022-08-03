import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFormData } from "../../../../api/exam.api";
import FormPreviewBody from "../../../../components/form/form_preview_body/FormPreviewBody";
import { delStorage, loadStorage } from "../../../../utils/persistLocalStorage";
import "./formPreviewPage.scss";

function FormPreviewPage() {
	const uuid = window.location.pathname.split("/")[3];
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	var user = loadStorage("user");
	const navigate = useNavigate();

	useEffect(() => {
		user = loadStorage("user");
		getFormData({
			token: user.token,
			edit: false,
			preview: true,
			uuid: uuid,
		})
			.then((res) => {
				console.log(res.data.data);
				setFormData(res.data.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response.status === 401) {
					delStorage("user");
					navigate("/auth/login");
				}
				setError(err.response.data.error);
				setLoading(false);
			});
	}, []);

	return (
		<div className="form_page_container">
			{error ? (
				<div>
					<span>{error}</span>
				</div>
			) : (
				!loading && <FormPreviewBody user={user} formData={formData} />
			)}
		</div>
	);
}

export default FormPreviewPage;
