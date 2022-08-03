import React from 'react'
import { Link } from 'react-router-dom'
import './blueLinkButton.scss';

function BlueLinkButton(props) {
	const { btnText, btnLink } = props
	return (
		<div>
			<Link className='BlueBtn' to={btnLink}>
				{btnText}
			</Link>
		</div>
	)
}

export default BlueLinkButton