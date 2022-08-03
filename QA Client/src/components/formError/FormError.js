import React from 'react';
import './formError.scss';

function FormError(props) {
	const { error } = props;
	return (
		<div className="formError">{error}</div>
	)
}

export default FormError