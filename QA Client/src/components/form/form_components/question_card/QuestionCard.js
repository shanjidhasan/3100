import axios from "axios";
import React, { useEffect, useState } from "react";
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
	isPreview,
}) {
	const [questionText, setQuestionText] = useState(
		question.question_text || ""
	);

	const [questionMaterial, setQuestionMaterial] = useState(
		question.question_material
	);
	const [questionFile, setQuestionFile] = useState();
	const [questionFileType, setQuestionFileType] = useState();
	const [questioFilePreview, setQuestionFilePreview] = useState();

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

	const [questionAnswerMaterial, setQuestionAnswerMaterial] = useState(
		question.answer_material
	);
	const [questionAnswerFile, setQuestionAnswerFile] = useState();
	const [questionAnswerFileType, setQuestionAnswerFileType] = useState();
	const [questionAnswerFilePreview, setQuestionAnswerFilePreview] =
		useState();

	const [questionVisible, setQuestionVisible] = useState(question.is_active);
	const [questionRequired, setQuestionRequired] = useState(
		question.is_required
	);

	const newOption = "Option";
	console.log(question);

	useEffect(() => {
		if (!questionFile) {
			setQuestionFilePreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(questionFile);
		setQuestionFilePreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [questionFile]);

	useEffect(() => {
		if (!questionAnswerFile) {
			setQuestionAnswerFilePreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(questionAnswerFile);
		setQuestionAnswerFilePreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
	}, [questionAnswerFile]);

	const handleQuestionFileChange = (event) => {
		setQuestionFile(event.target.files[0]);
		setQuestionFileType(event.target.files[0]?.type);

		setQuestionMaterial(undefined);
	};

	const clearQuestionFile = () => {
		setQuestionFile(undefined);
		setQuestionFilePreview(undefined);
	};

	const clearQuestionMaterial = () => {
		setQuestionMaterial(undefined);
	};

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

	const handleAnswerFileChange = (event) => {
		setQuestionAnswerFile(event.target.files[0]);
		setQuestionAnswerFileType(event.target.files[0]?.type);

		setQuestionAnswerMaterial(undefined);
	};

	const clearAnswerFile = () => {
		setQuestionAnswerFile(undefined);
		setQuestionAnswerFilePreview(undefined);
	};

	const clearAnswerMaterial = () => {
		setQuestionAnswerMaterial(undefined);
	};

	const toggleVisibility = () => {
		setQuestionVisible(!questionVisible);
	};

	const toggleRequired = () => {
		setQuestionRequired(!questionRequired);
	};

	const handleUpdateQuestion = () => {
		var questionMaterialCleared = false;
		if (!questionMaterial && !questionFile) {
			questionMaterialCleared = true;
		}

		var questionAnswerMaterialCleared = false;
		if (!questionAnswerMaterial && !questionAnswerFile) {
			questionAnswerMaterialCleared = true;
		}

		var formData = new FormData();
		formData.append("userId", userId);
		formData.append("questionId", question.id);
		formData.append("examUUID", examUUID);
		formData.append("questionText", questionText);
		formData.append("questionFile", questionFile);
		formData.append("questionFileType", questionFileType);
		formData.append("questionType", questionType);
		formData.append("questionDescription", questionDescription);
		formData.append("questionMarks", questionMarks);
		formData.append("questionAnswer", questionAnswer);
		formData.append("questionOptions", questionOptions);
		formData.append("questionAnswerOptions", questionAnswerOptions);
		formData.append("questionAnswerFile", questionAnswerFile);
		formData.append("questionAnswerFileType", questionAnswerFileType);
		formData.append("questionVisible", questionVisible);
		formData.append("questionRequired", questionRequired);
		formData.append("questionMaterialCleared", questionMaterialCleared);
		formData.append(
			"questionAnswerMaterialCleared",
			questionAnswerMaterialCleared
		);

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
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="QuestionCardContainer">
			<div className="card_top">
				<div className="question_row">
					<div className="question_container">
						<span className="question_index">{index + 1}</span>
						<div className="question_text_container">
							<label>Question</label>
							<textarea
								type="text"
								name="question"
								className="question_text"
								placeholder="Question"
								value={questionText}
								onChange={(e) =>
									setQuestionText(e.target.value)
								}
								disabled={isPreview}
							></textarea>
						</div>
					</div>
					{!isPreview && (
						<>
							<div className="question_file">
								<label htmlFor="fileInput">
									Upload Question
								</label>
								<input
									type="file"
									id="fileInput"
									name="question_file"
									accept={["image/*", "application/pdf"]}
									onChange={handleQuestionFileChange}
								/>
							</div>
							<div className="question_type">
								<label>Answer Type</label>
								<select
									name="question_type"
									onChange={handleQuestionTypeChange}
									value={questionType}
								>
									<option value="text">Text</option>
									<option value="multiple_choice">
										Multiple Choice
									</option>
									<option value="checkbox">Checkbox</option>
									<option value="dropdown">Dropdown</option>
									<option value="file_upload">
										File Upload
									</option>
								</select>
							</div>
						</>
					)}
				</div>
				<div className="preview_row">
					{questionMaterial && questionFile && (
						<>
							{questionFileType.match("image") ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<img
										className="previewImg"
										src={questioFilePreview}
										alt="Question Preview"
										style={{
											width: "250px",
											height: "250px",
											marginBottom: "10px",
										}}
									/>
									<span>Question Preview</span>
								</div>
							) : questionFileType === "application/pdf" ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<iframe
										title="question_preview"
										src={questioFilePreview}
										style={{
											width: "350px",
											height: "350px",
										}}
									></iframe>
									<span>Question Preview</span>
								</div>
							) : null}
							{/* add clear button */}
							<button
								className="clearButton"
								onClick={clearQuestionFile}
							>
								<i className="fas fa-times" /> Clear
							</button>
						</>
					)}
					{questionMaterial && !questionFile && (
						<>
							{questionMaterial.file_type.match("image") ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<img
										className="previewImg"
										src={
											MAT_URL + questionMaterial.file_path
										}
										alt="Question Preview"
										style={{
											width: "250px",
											height: "250px",
											marginBottom: "10px",
										}}
									/>
									<span>Question Preview</span>
								</div>
							) : questionMaterial.file_type ===
							  "application/pdf" ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<iframe
										title="question_preview"
										src={
											MAT_URL + questionMaterial.file_path
										}
										style={{
											width: "350px",
											height: "350px",
										}}
									></iframe>
									<span>Question Preview</span>
								</div>
							) : null}
							{/* add clear button */}
							<button
								className="clearButton"
								onClick={clearQuestionMaterial}
							>
								<i className="fas fa-times" /> Clear
							</button>
						</>
					)}
					{!questionMaterial && questionFile && (
						<>
							{questionFileType.match("image") ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<img
										className="previewImg"
										src={questioFilePreview}
										alt="Question Preview"
										style={{
											width: "250px",
											height: "250px",
											marginBottom: "10px",
										}}
									/>
									<span>Question Preview</span>
								</div>
							) : questionFileType === "application/pdf" ? (
								<div
									style={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<iframe
										title="question_preview"
										src={questioFilePreview}
										style={{
											width: "350px",
											height: "350px",
										}}
									></iframe>
									<span>Question Preview</span>
								</div>
							) : null}
							<button
								className="clearButton"
								onClick={clearQuestionFile}
							>
								<i className="fas fa-times" /> Clear
							</button>
						</>
					)}
				</div>
			</div>

			<div className="card_mid">
				<div className="desc_row">
					<div className="question_desc">
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
					</div>

					<div className="question_marks">
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
					</div>
				</div>

				<div className="question_answer">
					<div className="text_container">
						{questionType === "text" && (
							<div className="text_input">
								<label>Answer</label>
								<textarea
									type="text"
									name="question_answer"
									placeholder="Answer"
									value={questionAnswer}
									onChange={handleQuestionAnswerChange}
									disabled={isPreview}
								></textarea>
							</div>
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
											type="radio"
											className="radio"
											name="question_answer"
											disabled
										/>

										<input
											type="text"
											className="text"
											value={option}
											onChange={(e) => {
												updateOption(e, optIdx);
											}}
											disabled={isPreview}
										/>

										{!isPreview && (
											<>
												<div
													className="delete"
													title="Delete Option"
													onClick={(e) => {
														removeOption(optIdx);
													}}
												>
													<i className="fas fa-times" />
												</div>
												<div
													className="answer"
													title="Select as Answer"
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
													/>
													<label>
														Select as Answer
													</label>
												</div>
											</>
										)}
									</div>
								);
							})}

							{!isPreview && (
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

					{questionType === "checkbox" && (
						<div className="checkbox_container">
							{questionOptions?.map((option, optIdx) => {
								return (
									<div
										className="checkbox_option"
										key={optIdx}
									>
										<input
											type="checkbox"
											className="check"
											name="question_answer"
											disabled
										/>

										<input
											type="text"
											className="text"
											value={option}
											onChange={(e) => {
												updateOption(e, optIdx);
											}}
										/>

										{!isPreview && (
											<>
												<div
													className="delete"
													title="Delete Option"
													onClick={(e) => {
														removeOption(optIdx);
													}}
												>
													<i className="fas fa-times" />
												</div>
												<div
													className="answer"
													title="Select as Answer"
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
													/>
													<label>
														Select as Answer
													</label>
												</div>
											</>
										)}
									</div>
								);
							})}

							{!isPreview && (
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

					{questionType === "dropdown" && (
						<div className="checkbox_container">
							{questionOptions?.map((option, optIdx) => {
								return (
									<div
										className="checkbox_option"
										key={optIdx}
									>
										<span>{`${optIdx + 1}.`}</span>

										<input
											type="text"
											className="text"
											value={option}
											onChange={(e) => {
												updateOption(e, optIdx);
											}}
											disabled={isPreview}
										/>

										{!isPreview && (
											<>
												<div
													className="delete"
													title="Delete Option"
													onClick={(e) => {
														removeOption(optIdx);
													}}
												>
													<i className="fas fa-times" />
												</div>
												<div
													className="answer"
													title="Select as Answer"
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
													/>
													<label>
														Select as Answer
													</label>
												</div>
											</>
										)}
									</div>
								);
							})}

							{!isPreview && (
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

					{questionType === "file_upload" && (
						<div className="file_upload_container">
							<div className="upload_container">
								<label>Answer File</label>
								<input
									type="file"
									accept={["image/*", "application/pdf"]}
									onChange={handleAnswerFileChange}
								/>
							</div>
							<div className="preview_container">
								{questionAnswerMaterial && questionAnswerFile && (
									<>
										{questionAnswerFileType.match(
											"image"
										) ? (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<img
													className="previewImg"
													src={
														questionAnswerFilePreview
													}
													alt="Answer Preview"
													style={{
														width: "250px",
														height: "250px",
														marginBottom: "10px",
													}}
												/>
												<span>Answer Preview</span>
											</div>
										) : questionAnswerFileType ===
										  "application/pdf" ? (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<iframe
													title="Answer Preview"
													src={
														questionAnswerFilePreview
													}
													style={{
														width: "350px",
														height: "350px",
													}}
												></iframe>
												<span>Answer Preview</span>
											</div>
										) : null}
										{/* add clear button */}
										<button
											className="clearButton"
											onClick={clearAnswerFile}
										>
											<i className="fas fa-times" /> Clear
										</button>
									</>
								)}
								{questionAnswerMaterial && !questionAnswerFile && (
									<>
										{questionAnswerMaterial.file_type.match(
											"image"
										) ? (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<img
													className="previewImg"
													src={
														MAT_URL +
														questionAnswerMaterial.file_path
													}
													alt="Answer Preview"
													style={{
														width: "250px",
														height: "250px",
														marginBottom: "10px",
													}}
												/>
												<span>Answer Preview</span>
											</div>
										) : questionAnswerMaterial.file_type ===
										  "application/pdf" ? (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<iframe
													title="Answer Preview"
													src={
														MAT_URL +
														questionAnswerMaterial.file_path
													}
													style={{
														width: "350px",
														height: "350px",
													}}
												></iframe>
												<span>Answer Preview</span>
											</div>
										) : null}
										{/* add clear button */}
										<button
											className="clearButton"
											onClick={clearAnswerMaterial}
										>
											<i className="fas fa-times" /> Clear
										</button>
									</>
								)}
								{!questionAnswerMaterial && questionAnswerFile && (
									<>
										{questionAnswerFileType.match(
											"image"
										) ? (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<img
													className="previewImg"
													src={
														questionAnswerFilePreview
													}
													alt="Answer Preview"
													style={{
														width: "250px",
														height: "250px",
														marginBottom: "10px",
													}}
												/>
												<span>Answer Preview</span>
											</div>
										) : questionAnswerFileType ===
										  "application/pdf" ? (
											<div
												style={{
													display: "flex",
													flexDirection: "column",
												}}
											>
												<iframe
													title="Answer Preview"
													src={
														questionAnswerFilePreview
													}
													style={{
														width: "350px",
														height: "350px",
													}}
												></iframe>
												<span>Answer Preview</span>
											</div>
										) : null}
										<button
											className="clearButton"
											onClick={clearAnswerFile}
										>
											<i className="fas fa-times" /> Clear
										</button>
									</>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			{!isPreview && (
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
					{/* <div className="card_bottom_option">
						<span>Required</span>
						<input
							type="checkbox"
							title="If checked, the question will be required to be answered"
							name="required"
							defaultChecked={questionRequired}
							onChange={toggleRequired}
						/>
					</div> */}
				</div>
			)}
		</div>
	);
}

export default QuestionCard;
