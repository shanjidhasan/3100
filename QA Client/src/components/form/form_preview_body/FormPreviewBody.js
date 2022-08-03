import React, { useEffect, useState } from "react";
import FormTitleDescription from "../form_components/form_title_desc/FormTitleDescription";
import QuestionCard from "../form_components/question_card/QuestionCard";

function FormPreviewBody({ user, formData }) {
	const [title, setTitle] = useState(formData.title);
	const [description, setDescription] = useState(formData.details);
	const [formDue, setFormDue] = useState(formData.due_date_time);
	const [formPassMark, setFormPassMark] = useState(formData.pass_marks);
	const [formTotalmarks, setFormTotalmarks] = useState(
		formData.total_marks
	);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		setQuestions(
			formData.questions.length > 0 ? formData.questions : []
		);
	}, [formData.questions]);

	return (
		<div className="form_body_container">
			<FormTitleDescription
				formTitle={title}
				formDescription={description}
				formDue={formDue}
				formPassMark={formPassMark}
				formTotalmarks={formTotalmarks}
				isPreview={true}
			/>
			{questions &&
				questions.map((question, index) => {
					return (
						<QuestionCard
							key={index}
							question={question}
							index={index}
							userId={user.id}
							token={user.token}
							examUUID={formData.uuid}
							isPreview={true}
						/>
					);
				})}
		</div>
	);
}

export default FormPreviewBody;
