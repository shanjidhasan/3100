import React from "react";
import "./blueButton.scss";

function BlueButton(props) {
	const { btnText, type, onClick } = props;
	return (
		<button className="BlueBtn" type={type} onClick={onClick}>
			{btnText}
		</button>
	);
}

export default BlueButton;
