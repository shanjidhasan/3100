import { EditTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./formTitleDescription.scss";

function FormTitleDescription({
	formTitle,
	formDescription,
	formDue,
	formPassMark,
	formTotalmarks,
	handleChange,
	handleUpdateInfo,
	isPreview,
	examUUID,
	navigate
}) {
	console.log(examUUID);
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
					type="text"
					name="title"
					placeholder="Form title"
					value={formTitle}
					onChange={handleChange}
					disabled={isPreview}
				/>
			</div>
			<div className="form_title_description_description">
				<textarea
					name="description"
					placeholder="Form description"
					value={formDescription}
					onChange={handleChange}
					disabled={isPreview}
				></textarea>
			</div>
			<hr />
			<div className="class_info_container">
				<div className="class_info_item">
					<span>Pass Marks:</span>
					<input
						name="pass_marks"
						type="text"
						placeholder="Enter pass marks"
						value={formPassMark}
						onChange={handleChange}
						disabled={isPreview}
					/>
				</div>
				<div className="class_info_item">
					<span>Total Marks:</span>
					<input
						name="total_marks"
						type="text"
						placeholder="Enter total marks"
						value={formTotalmarks}
						onChange={handleChange}
						disabled
					/>
				</div>
			</div>
			<hr />
			<div className="action_container">
				{!isPreview && (
					<>
						<div>
							<div className="btn" onClick={() => {
								navigate("/forms/preview/" + examUUID);
							}}>
								<i className="fas fa-save"></i> Preview
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
		</div>
	);
}

export default FormTitleDescription;
