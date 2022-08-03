import React, { useEffect, useState } from "react";
import "./formPage.scss";
import { getFormData } from "../../../../api/exam.api";
import { delStorage, loadStorage } from "../../../../utils/persistLocalStorage";
import FormBody from "../../../../components/form/form_body/FormBody";
import Header from "../../../TeacherPage/components/header/Header";
import { useNavigate } from "react-router-dom";

function FormPage() {
    const uuid = window.location.pathname.split("/")[2];
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    var user = loadStorage("user");

	const navigate = useNavigate();

	useEffect(() => {
		user = loadStorage("user");
		getFormData({
			token: user.token,
			edit: true,
			preview: false,
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
            <div
                className="form_page_header"
                style={{
                    width: "100%",
                    paddingBottom: "5px",
                    borderBottom: "1px solid #e6e6e6",
                }}
            >
                <Header />
            </div>
            {error ? (
                <div>
                    <span>{error}</span>
                </div>
            ) : (
                !loading && <FormBody user={user} formData={formData} />
            )}
        </div>
    );
}

export default FormPage;
