import React, { useEffect, useState } from "react";
import {
	createQuestion,
	deleteQuestion,
	updateFormInfo,
} from "../../../api/exam.api";
import "./formBody.scss";
import FormTitleDescription from "./../form_components/form_title_desc/FormTitleDescription";
import QuestionCard from "../form_components/question_card/QuestionCard";
import { useNavigate } from "react-router-dom";
import Toast from "../../toast/Toast";
import { createToastMessage } from "../../../utils/toastUtil";

function FormBody({ user, formData }) {
	const [formUuid, setFormUuid] = useState(formData.uuid);
	const [title, setTitle] = useState(formData.title);
	const [description, setDescription] = useState(formData.details);
	const [formDue, setFormDue] = useState(formData.due_date_time);
	const [formPassMark, setFormPassMark] = useState(formData.pass_marks);
	const [formTotalmarks, setFormTotalmarks] = useState(
		formData.total_marks
	);

	const [questions, setQuestions] = useState([]);

	const [toastList, setToastList] = useState([]);
	const [position, setPosition] = useState("bottom-right");

	const navigate = useNavigate();

	const handleAddQuestion = () => {
		createQuestion({
			token: user.token,
			examId: formData.id,
		})
			.then((res) => {
				console.log(res);
				setQuestions([...questions, res.data.data]);
				createToastMessage(
					"success",
					"Success",
					res.data.message,
					toastList,
					setToastList
				);
			})
			.catch((err) => {
				createToastMessage(
					"error",
					"Error",
					err.response.data.error,
					toastList,
					setToastList
				);
				console.log(err);
			});
	};

	const handleDeleteQuestion = (questionId) => {
		console.log(questionId);
		deleteQuestion({ token: user.token, questionId: questionId })

			.then((res) => {
				console.log(questionId);
				// setQuestions(
				// 	res.data.data
				// );
				// delete only the question from the questions array
				createToastMessage(
					"success",
					"Success",
					res.data.message,
					toastList,
					setToastList
				);
				setQuestions([])
				setQuestions(res.data.data["questions"]);
				setFormTotalmarks(res.data.data["total_marks"]);
				console.log(questions);
			})
			.catch((err) => {
				createToastMessage(
					"error",
					"Error",
					err.response.data.error,
					toastList,
					setToastList
				);
				console.log(err);
			});
	};

	useEffect(() => {
		setQuestions(
			formData.questions.length > 0 ? formData.questions : []
		);
	}, [formData.questions]);

	const handleChangeInfo = (e) => {
		const { name, value } = e.target;
		if (name === "title") {
			setTitle(value);
		} else if (name === "description") {
			setDescription(value);
		} else if (name === "due_date_time") {
			setFormDue(value);
		} else if (name === "pass_marks") {
			setFormPassMark(value);
		}
	};

	const handleUpdateInfo = () => {
		console.log(title, description, formDue, formPassMark);
		updateFormInfo({
			token: user.token,
			uuid: formData.uuid,
			title: title,
			description: description,
			dueDateTime: formDue,
			passMarks: formPassMark,
		})
			.then((res) => {
				console.log(res.data);
				
				createToastMessage(
					"success",
					"Success",
					res.data.message,
					toastList,
					setToastList
				);
			})
			.catch((err) => {
				console.log(err);
				createToastMessage(
					"error",
					"Error",
					err.response.data.error,
					toastList,
					setToastList
				);
			});
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
					handleChange={handleChangeInfo}
					handleUpdateInfo={handleUpdateInfo}
					examUUID={formUuid}
					navigate={navigate}
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
								setFormTotalmarks={setFormTotalmarks}
								examUUID={formData.uuid}
								handleDeleteQuestion={handleDeleteQuestion}
								toastList={toastList}
								setToastList={setToastList}
								isPreview={false}
							/>
						);
					})}
				<div className="add_question_container">
					<button
						className="add_question_button"
						onClick={handleAddQuestion}
					>
						Add Question
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

export default FormBody;
