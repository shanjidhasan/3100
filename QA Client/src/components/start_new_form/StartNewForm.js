import React from "react";
import { createExam } from "../../api/exam.api";
import "./startNewForm.scss";

function StartNewForm({ user, navigate }) {
	const template_data = {
		name: "Create New Form",
		thumbnail:
			"https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png",
	};

	const handleCreateForm = () => {
		createExam({
			token: user.token,
			title: "",
			description: "",
		})
			.then((res) => {
				console.log(res);
				navigate("/forms/" + res.data.data.uuid);
			})
			.catch((err) => {
				console.log(err.response);
			});

	};

	return (
		<div className="start_new_form_container">
			<div className="title">
				<span>Start New Form</span>
			</div>
			<div className="template_list">
				<div className="template_item" onClick={handleCreateForm}>
					<div className="template_thumbnail">
						<img
							src={template_data.thumbnail}
							alt="template"
						/>
					</div>
					<div className="template_name">
						<span>{template_data.name}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default StartNewForm;
