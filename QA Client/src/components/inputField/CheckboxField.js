import React from "react";
import "./inputField.scss";

function CheckboxField({ name, value, onChange, label }) {
	return (
		<div className="form-group">
			<input
				className="checkField"
				type="checkbox"
				name={name}
				value={value}
				onChange={onChange}
			/>
			<label>{label}</label>
		</div>
	);
}

export default CheckboxField;
