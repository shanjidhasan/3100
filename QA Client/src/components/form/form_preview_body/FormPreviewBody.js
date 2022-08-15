import React, { useEffect, useState } from "react";
import { getFormPreviewData, getUUID, submitform } from "../../../api/exam.api";
import { loadStorage, saveStorage } from "../../../utils/persistLocalStorage";
import { createToastMessage } from "../../../utils/toastUtil";
import Toast from "../../toast/Toast";
import FormTitleDescription from "../form_components/form_title_desc/FormTitleDescription";
import QuestionCard from "../form_components/question_card/QuestionCard";
import { useNavigate } from "react-router-dom";

function FormPreviewBody({ user, formData }) {
	
	const navigate = useNavigate();
	console.log("formData" + { formData });
	const [title, setTitle] = useState(formData.title);
	const [examUUID, setExamUUID] = useState(formData.uuid);
	const [description, setDescription] = useState(formData.details);
	const [formDue, setFormDue] = useState(formData.due_date_time);
	const [formPassMark, setFormPassMark] = useState(formData.pass_marks);
	const [formTotalmarks, setFormTotalmarks] = useState(
		formData.total_marks
	);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		getFormPreviewData({
			token: user.token,
			uuid: formData.uuid,
		})
			.then((res) => {
				saveStorage("answerList", []);
				console.log(res.data);
				setQuestions(res.data.data.questions);
			}).catch((err) => {
				console.log(err);
			});
	}, []);

	const [toastList, setToastList] = useState([]);
	const [position, setPosition] = useState("bottom-right");

	const handleSubmit = async () => {
		var savedList = loadStorage("answerList");
		var newAnswerList = [];
		for (var i = 0; i < questions.length; i++) {
			for (var j = 0; j < savedList.length; j++) {
				if (questions[i].id === savedList[j].q_id) {
					newAnswerList.push(savedList[j]);
				}
			}
		}
		console.log(newAnswerList);
		console.log(formData);
		await submit(formData.id, newAnswerList);
		// if (newAnswerList.length === 0) {
		// 	createToastMessage(
		// 		"warning",
		// 		"Warning",
		// 		"Nothing to submit. Please answer all the questions.",
		// 		toastList,
		// 		setToastList
		// 	);
		// }
	};
	const submit = async (exam_id, answer) => {
		submitform({
			token: user.token,
			exam_id: exam_id,
			answer: answer,
			})
			.then((res) => {
				createToastMessage(
					"success",
					"Success",
					"Form submitted successfully.",
					toastList,
					setToastList
				);
				console.log(res.data.data);
				setTimeout(() => {

					navigate("/dashboard");
				}, 2000);
			}
			)
			.catch((err) => {
				createToastMessage(
					"error",
					"Error",
					err.response.data.error,
					toastList,
					setToastList
				);
			}
		);
	};


	return (
		<>
			<div className="form_body_container">
				<FormTitleDescription
					formTitle={title}
					formDescription={description}
					formDue={formDue}
					formPassMark={formPassMark}
					formTotalmarks={formTotalmarks}
					isPreview={true}
					examUUID={examUUID}
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
							// setAnswerList={setAnswerList}
							// answerList={answerList}
							/>
						);
					})}
				<div className="add_question_container">
					<button
						className="add_question_button"
						onClick={handleSubmit}
					>
						Submit Exam
					</button>
				</div>
			</div>

			<Toast
				toastList={toastList}
				position={position}
				autoDelete={true}
				autoDeleteTime={2000}
			/>
		</>
	);
}

export default FormPreviewBody;
