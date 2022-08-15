import { EditTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./formTitleDescription.scss";
import { CopyToClipboard } from 'react-copy-to-clipboard';

function FormTitleDescription({
	formTitle,
	formDescription,
	formDue,
	formPassMark,
	formTotalmarks,
	handleChange,
	handleUpdateInfo,
	student,
	examUUID,
	navigate,
	response,
	isPreview,
	isResponse,
}) {
	const [dueDateTime, setDueDateTime] = useState();
	const [editTime, setEditTime] = useState(false);

	useEffect(() => {
		if (formDue !== null) {
			const date = new Date(formDue);
			const day = date.getDate();
			const monthList = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];
			const textMonth = monthList[date.getMonth()];
			const year = date.getFullYear();
			const hour = date.getHours();
			const minute = date.getMinutes();
			const ampm = hour >= 12 ? "PM" : "AM";
			const hour12 = hour % 12;
			const sHours = hour12 < 10 ? `0${hour12}` : hour12;
			const sMinutes = minute < 10 ? `0${minute}` : minute;
			const formattedTime = `${sHours}:${sMinutes} ${ampm}`;
			setDueDateTime(`${day} ${textMonth}, ${year} ${formattedTime}`);
		}
	}, [dueDateTime]);

	return (
		<div className="FormTitleDescription_container">
			<div className="form_title_description_title">
				<input
					className={`${isPreview || isResponse ? "disabled" : ""}`}
					type="text"
					name="title"
					placeholder="Form title"
					value={formTitle}
					onChange={!isPreview && handleChange}
					disabled={isPreview || isResponse}
				/>
			</div>
			<div className="form_title_description_description">
				<textarea
					className={`${isPreview || isResponse ? "disabled" : ""}`}
					name="description"
					placeholder="Form description"
					value={formDescription}
					onChange={!isPreview && handleChange}
					disabled={isPreview || isResponse}
				></textarea>
			</div>
			<hr />
			<div className="class_info_container">
				<div className="class_info_item">
					<span>Pass Marks:</span>
					<input
						className={`${isPreview || isResponse ? "disabled" : ""}`}
						name="pass_marks"
						type="text"
						placeholder="Enter pass marks"
						value={formPassMark || "0"}
						onChange={(!isPreview || !isResponse) && handleChange}
						disabled={isPreview || isResponse}
					/>
				</div>
				<div className="class_info_item">
					<span>Total Marks:</span>
					<input
						className={`${isPreview ? "disabled" : ""}`}
						name="total_marks"
						type="text"
						placeholder="Enter total marks"
						value={formTotalmarks}
						onChange={!isPreview && handleChange}
						disabled
					/>
				</div>
			</div>
			<hr />
			{!isResponse && (
				<>
					<div className="action_item">
						<span>{examUUID.substring(0, 8)}</span>
						<CopyToClipboard style={{
							'margin': '15px'
						}} text={examUUID.substring(0, 8)}
							onCopy={() => this.setState({ copied: true })}>
							<button>Copy</button>
						</CopyToClipboard>
					</div>
					<div className="action_container">

						{!isPreview && (
							<>
								<div>
									<div className="btn" onClick={() => {
										navigate("/forms/responses/" + examUUID);
									}}>
										<i className="fas fa-list"></i> Responses
									</div>
								</div>
								<div>
									<div className="btn" onClick={() => {
										navigate("/forms/view/" + examUUID);
									}}>
										<i className="fas fa-eye"></i> Preview
									</div>
								</div>
								<div>
									<div className="btn" onClick={handleUpdateInfo}>
										<i className="fas fa-save"></i> Update
									</div>
								</div>
							</>
						)}
					</div>
				</>
			)}
			{isResponse && (
				<div>
					<div>
						<span>Username: </span>
						<span>{student}</span>
					</div>
					<div>
						<span>Obtained marks: </span>
						<span>{response.obtained_marks}</span>
					</div>
					</div>
			)}
		</div>
	);
}

export default FormTitleDescription;
