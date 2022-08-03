import React from "react";
import "./inputField.scss";

function InputField(props) {
	const { type, name, placeholder, value, onChange } = props;

	return (
		<input
			className="textField"
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
}

export default InputField;
