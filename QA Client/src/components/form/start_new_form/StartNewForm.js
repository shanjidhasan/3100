import React from "react";
import "./startNewForm.scss";

function StartNewForm() {
	const template_data = [
		{
			name: "Blank Form",
			thumbnail:
				"https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png",
		},
		{
			name: "Template 1",
			thumbnail:
				"https://ssl.gstatic.com/docs/templates/thumbnails/1xQF3s6EP0d58H-XJ7R440OpREKo4KqEapa0mkw43RPE_400.png",
		},
		{
			name: "Template 2",
			thumbnail:
				"https://ssl.gstatic.com/docs/templates/thumbnails/1kkUjv3G7-PgOEUPMTiKvKResxGxS7MTsy5Amj4b0Trw_400.png",
		},
		{
			name: "Template 3",
			thumbnail:
				"https://ssl.gstatic.com/docs/templates/thumbnails/1m0UYQl1LSGxl3sGsh9_xjim4hUYQ8BO_zbvcFXv1Qug_400.png",
		},
		{
			name: "Template 4",
			thumbnail:
				"https://ssl.gstatic.com/docs/templates/thumbnails/134dbGrMBrHFEfdPk5UpsZWEBZb7xJrOKRdESE58Fvcg_400.png",
		},
		{
			name: "Template 5",
			thumbnail:
				"https://ssl.gstatic.com/docs/templates/thumbnails/1xQF3s6EP0d58H-XJ7R440OpREKo4KqEapa0mkw43RPE_400.png",
		},
	];

	return (
		<div className="start_new_form_container">
			<div className="title">
				<span>Start New Form</span>
			</div>
			<div className="template_list">
				{template_data.map((template, index) => {
					return (
						<div className="template_item" key={index}>
							<div className="template_thumbnail">
								<img
									src={template.thumbnail}
									alt="template"
								/>
							</div>
							<div className="template_name">
								<span>{template.name}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default StartNewForm;
