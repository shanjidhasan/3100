import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStorage, saveStorage } from "../../../../utils/persistLocalStorage";
import { createToastMessage } from "../../../../utils/toastUtil";
import { MAT_URL, UPDATE_QUESTION_URL } from "../../../../utils/urls";
import "./questionCard.scss";

function QuestionCard({
	question,
	index,
	userId,
	token,
	setFormTotalmarks,
	examUUID,
	handleDeleteQuestion,
	toastList,
	setToastList,
	isPreview,
	isResponse,
}) {

	const [questionText, setQuestionText] = useState(
		question.question_text || ""
	);

	const [questionType, setQuestionType] = useState(question.type);
	const [questionDescription, setQuestionDescription] = useState(
		question.description || ""
	);

	const [questionAnswer, setQuestionAnswer] = useState(question.answer || "");
	const [questionOptions, setQuestionOptions] = useState(
		question.options && question.options
	);
	const [questionAnswerOptions, setQuestionAnswerOptions] = useState(
		question.answer_options && question.answer_options
	);

	const [questionMarks, setQuestionMarks] = useState(question.marks);

	const [questionVisible, setQuestionVisible] = useState(question.is_active);

	const newOption = "Option";
	console.log(question);

	const handleQuestionTypeChange = (e) => {
		setQuestionType(e.target.value);
	};

	const handleQuestionDescriptionChange = (e) => {
		setQuestionDescription(e.target.value);
	};

	const handleQuestionMarksChange = (e) => {
		if (e.target.value < 0) {
			setQuestionMarks(0);
		}
		setQuestionMarks(e.target.value);
	};

	const handleQuestionAnswerChange = (e) => {
		setQuestionAnswer(e.target.value);
	};

	const updateOption = (e, optIdx) => {
		const newOptions = [...questionOptions];
		newOptions[optIdx] = e.target.value;
		setQuestionOptions(newOptions);
	};

	const addNewOption = () => {
		console.log(questionOptions);
		setQuestionOptions([...questionOptions, newOption]);
		setQuestionAnswerOptions([...questionAnswerOptions, false]);
	};

	const removeOption = (optIdx) => {
		const newOptions = [...questionOptions];
		const newAnswerOptions = [...questionAnswerOptions];
		newOptions.splice(optIdx, 1);
		newAnswerOptions.splice(optIdx, 1);
		setQuestionOptions(newOptions);
		setQuestionAnswerOptions(newAnswerOptions);
	};

	const handleOptionAnswerChange = (e, optIdx) => {
		const newAnswerOptions = [...questionAnswerOptions];
		newAnswerOptions[optIdx] = e.target.checked.toString();
		setQuestionAnswerOptions(newAnswerOptions);
	};

	const toggleVisibility = () => {
		setQuestionVisible(!questionVisible);
	};

	const handleUpdateQuestion = () => {

		var formData = new FormData();
		formData.append("userId", userId);
		formData.append("questionId", question.id);
		formData.append("examUUID", examUUID);
		formData.append("questionText", questionText);
		formData.append("questionType", questionType);
		formData.append("questionDescription", questionDescription);
		formData.append("questionMarks", questionMarks);
		formData.append("questionAnswer", questionAnswer);
		formData.append("questionOptions", questionOptions);
		formData.append("questionAnswerOptions", questionAnswerOptions);
		formData.append("questionVisible", questionVisible);

		axios({
			method: "put",
			url: UPDATE_QUESTION_URL,
			headers: {
				"x-auth-token": token,
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		})
			.then((res) => {
				console.log(res.data);
				console.log(res.data.data.exam);
				setFormTotalmarks(res.data.data.exam.total_marks);
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

	const [answer, setAnswer] = useState("");
	var answerOptions = [];

	useEffect(() => {
		if (isPreview && question.type === "multiple_choice") {
			for (let i = 0; i < questionOptions.length; i++) {
				answerOptions.push(false);
			}
		}
	}, []);

	useEffect(() => {
		if (isPreview) {
			handleAnswerTextChange(answer);
		}
	}, [answer]);

	const handleAnswerTextChange = (answer) => {
		var answerList = loadStorage("answerList")
		console.log(answerList)

		var found = false;
		for (let i = 0; i < answerList.length; i++) {
			// 	// this.setState({
			// 	// 	text: event.target.value
			// 	//   }, () => {
			// 	// 	console.log("New state in ASYNC callback:", this.state.text);
			// 	//   });
			if (answerList[i].q_id === question.id) {
				answerList[i].answer = answer;
				found = true;
			}

		}
		if (!found) {
			var ansObj = {
				q_id: question.id,
				answer: answer,
			}
			answerList.push(ansObj)
		}
		saveStorage("answerList", answerList)
	};

	const handleMultipleChoiceAnswerChange = (answer, idx) => {
		console.log(answer, idx);
		var answerList = loadStorage("answerList")
		console.log(answerList)

		var found = false;
		answerOptions[idx] = answer;
		// 
		// list to string
		var answerListStr = answerOptions.join(",");
		for (let i = 0; i < answerList.length; i++) {
			if (answerList[i].q_id === question.id) {
				answerList[i].answer = answerListStr
				found = true;
			}
		}
		if (!found) {
			var ansObj = {
				q_id: question.id,
				answer: answerListStr,
			}
			answerList.push(ansObj)
		}
		saveStorage("answerList", answerList)
	};

	return (
		<div className="QuestionCardContainer">
			<div className="card_top">
				<div className="question_row">
					<div className="question_container">
						<span className="question_index">{index + 1}</span>
						<div className="question_text_container">
							<label>Question</label>
							{!isPreview || !isResponse ? <textarea
								type="text"
								name="question"
								className="question_text"
								placeholder="Question"
								value={questionText}
								onChange={(e) =>
									setQuestionText(e.target.value)
								}
								disabled={isPreview || isResponse}
							></textarea>
								: <span>{question.question_text}</span>
							}
						</div>
					</div>
					{!isPreview && (
						<>
							<div className="question_type">
								<label>Answer Type</label>
								<select
									name="question_type"
									onChange={handleQuestionTypeChange}
									value={questionType}
									disabled={isPreview || isResponse}
								>
									<option value="text">Text</option>
									<option value="multiple_choice">
										Multiple Choice
									</option>
								</select>
							</div>
						</>
					)}

					{isPreview && <div className="question_marks">
						<label>Marks</label>
						<span>{question.marks}</span>
					</div>}
				</div>
			</div>

			<div className="card_mid">
				<div className="desc_row">
					{
						isResponse && (
							<>
								<div className="question_marks">
									<label>Question Marks</label>
									<input
										type="number"
										id="question_marks"
										name="marks"
										placeholder="Enter marks"
										value={questionMarks}
										disabled={true}
									/>
								</div><div className="question_marks">
									<label>Obtained Marks</label>
									<input
										type="number"
										id="question_marks"
										name="marks"
										placeholder="Enter marks"
										value={question.ob_marks || "0"}
										disabled={true}
									/>
								</div>
							</>
						)
					}
					<div className="question_desc">
						{!isPreview && !isResponse ?
							<>
								<label>Question Description</label>
								<input
									type="text"
									id="question_description"
									name="description"
									placeholder="Write something..."
									value={questionDescription}
									onChange={handleQuestionDescriptionChange}
									disabled={isPreview}
								/>
							</>
							: <span>{questionDescription}</span>
						}
					</div>

					{!isPreview && !isResponse && <div className="question_marks">
						<label>Marks</label>
						<input
							type="number"
							id="question_marks"
							name="marks"
							placeholder="Enter marks"
							value={questionMarks}
							onChange={handleQuestionMarksChange}
							disabled={isPreview}
						/>
					</div>}
				</div>

				<div className="question_answer">
					<div className="text_container">
						{questionType === "text" && (
							<>
								<div className="text_input">
									<label>Answer</label>
									<textarea
										type="text"
										name="question_answer"
										placeholder="Answer"
										value={isPreview ? answer : isResponse ? questionAnswer : questionAnswer}
										onChange={
											(e) => {
												if (isPreview) {
													setAnswer(e.target.value);
												} else {
													handleQuestionAnswerChange(e);
												}
											}
										}
										disabled={isResponse}
									></textarea>
								</div>
								{
									isResponse && (
										<div className="text_input">
											<label>Correct Answer</label>
											<textarea
												type="text"
												name="question_answer"
												placeholder="Answer"
												value={question.student_answer}
												disabled={true}
											></textarea>
										</div>)
								}
							</>
						)}
					</div>

					{questionType === "multiple_choice" && (
						<div className="multiple_choice_container">
							{questionOptions?.map((option, optIdx) => {
								return (
									<div
										className="multiple_choice_option"
										key={optIdx}
									>
										<input
											type="checkbox"
											className="radio"
											name="question_answer"
											disabled={!isPreview && !isResponse}
											checked={isResponse && question.student_answer[optIdx] === "true"}
											onChange={(e) => {
												if (isPreview) {
													handleMultipleChoiceAnswerChange(e.target.checked, optIdx);
												}
											}}
										/>

										<input
											type="text"
											className="text"
											value={option}
											onChange={(e) => {
												updateOption(e, optIdx);
											}}
											disabled={isPreview || isResponse}
										/>

										{!isPreview && !isResponse && (

											<div
												className="delete"
												title="Delete Option"
												onClick={(e) => {
													removeOption(optIdx);
												}}
											>
												<i className="fas fa-times" />
											</div>
										)}
										{!isPreview && (
											<div
												className="answer"
												title={isResponse ? "Selected as Answer" : "Select as Answer"}
											>
												<input
													type="checkbox"
													checked={
														questionAnswerOptions[
														optIdx
														] === "true"
													}
													onChange={(e) => {
														handleOptionAnswerChange(
															e,
															optIdx
														);
													}}
													disabled={isResponse}
												/>
												<label>
												{isResponse ? "Selected as Answer" : "Select as Answer"}
												</label>
											</div>
										)}
									</div>
								);
							})}

							{(!isPreview && !isResponse) && (
								<div className="add_option_container">
									<div className="add_option">
										<button
											title="Add a new option"
											onClick={addNewOption}
										>
											+ Add Option
										</button>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			{!isPreview && !isResponse && (
				<div className="card_bottom">
					<div
						className="btn"
						title="Update Question"
						onClick={handleUpdateQuestion}
					>
						<i className="fas fa-save"></i> Update
					</div>
					<div
						className="btn"
						title="Delete Question"
						onClick={() => {
							handleDeleteQuestion(question.id);
						}}
					>
						<i className="fas fa-trash-alt" /> Delete
					</div>
					<div className="card_bottom_option">
						<span>Show</span>
						<input
							type="checkbox"
							title="If checked, the question will be shown to the students"
							name="visibility"
							defaultChecked={questionVisible}
							onChange={toggleVisibility}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default QuestionCard;
