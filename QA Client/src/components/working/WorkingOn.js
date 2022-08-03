import React from "react";
import "./working_on.scss";

function WorkingOn(props) {
	return (
		<div>
			<h1>{props.pageName}</h1>
			<img
				className="working_on_img"
				src={require("../../media/images/dev/working-on.png")}
				alt="working on"
			/>
		</div>
	);
}

export default WorkingOn;
