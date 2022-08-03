import React, { useState } from "react";
import FormTitleDescription from "../form_components/form_title_desc/FormTitleDescription";
import QuestionCard from "../form_components/question_card/QuestionCard";

function FormPreviewBody() {
	const [questions, setQuestions] = useState([
		{
			index: 0,
			question: "What is your name?",
			description: "",
			type: "text",
			required: true,
			options: ["Alice", "Bob"],
			questionMaterial: null,
			answer: "",
			selectedOption: "",
			answerMaterial: null,
		},
		{
			index: 1,
			question: "What is your age?",
			description: "",
			type: "text",
			required: true,
			options: [],
			questionMaterial: null,
			answer: "",
			selectedOption: "",
			answerMaterial: null,
		},
		{
			index: 2,
			question: "What is your favorite color?",
			description: "",
			type: "multiple_choice",
			required: false,
			options: ["Red", "Blue", "Green", "Yellow"],
			questionMaterial: null,
			answer: "",
			selectedOption: "",
			answerMaterial: null,
		},
		{
			index: 3,
			question: "What are your favorite foods?",
			description: "",
			type: "checkbox",
			required: false,
			options: ["Pizza", "Pasta", "Tacos", "Burritos"],
			questionMaterial: null,
			answer: "",
			selectedOption: "",
			answerMaterial: null,
		},
		{
			index: 4,
			question: "Do you have a pet?",
			description: "",
			type: "dropdown",
			required: true,
			options: ["Yes", "No"],
			questionMaterial: null,
			answer: "",
			selectedOption: "",
			answerMaterial: null,
		},
		{
			index: 5,
			question: "Upload your image",
			description: "",
			type: "file_upload",
			required: true,
			options: ["Yes", "No"],
			questionMaterial: null,
			answer: "",
			selectedOption: "",
			answerMaterial: null,
		},
	]);

	return (
		<div className="form_body_container">
			<FormTitleDescription isPreview={true} />
			{questions?.map((question, index) => {
				return (
					<QuestionCard
						key={index}
						question={question}
						questions={questions}
						setQuestions={setQuestions}
						index={index}
						isPreview={true}
					/>
				);
			})}
		</div>
	);
}

export default FormPreviewBody;
