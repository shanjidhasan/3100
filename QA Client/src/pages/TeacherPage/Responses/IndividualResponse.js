import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { get_form_response_data_by_exam_id_and_student_id } from '../../../api/exam.api'
import FormTitleDescription from '../../../components/form/form_components/form_title_desc/FormTitleDescription'
import QuestionCard from '../../../components/form/form_components/question_card/QuestionCard'
import { loadStorage } from '../../../utils/persistLocalStorage'

const IndividualResponse = () => {
  // /get uuid from url
  const uuid = window.location.pathname.split('/')[3]
  const userId = window.location.pathname.split('/')[4]

  const [response, setResponse] = useState([])
  const [username, setUsername] = useState('')
	
	const [questions, setQuestions] = useState([]);

  var user = loadStorage("user");
  const navigate = useNavigate();

  console.log("Hereeeeeeeeeeeeeeeee")
  useEffect(() => {
    get_form_response_data_by_exam_id_and_student_id({
      token: user.token,
      exam_id: uuid,
      student_id: userId
    })
      .then((res) => {
        console.log(res.data)
        setQuestions(res.data.data.questions)
        setUsername(res.data.data.student.username)
        setResponse(res.data.data)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      });

  }, [])
  return (
		<div className="form_body_container">
		
			<FormTitleDescription
				formTitle={response.title}
				formDescription={response.details}
				formDue={response.due_date_time}
				formPassMark={response.pass_marks}
				formTotalmarks={response.total_marks}
        student={username}
				examUUID={uuid}
				navigate={navigate}
				response={response}
        isPreview={false}
        isResponse={true}
			/>
			{questions &&
				questions.map((question, index) => {
					return (
						<QuestionCard
							key={index}
							question={question}
							index={index}
							userId={user.id}
							token={user.token}
							examUUID={response.uuid}
							isPreview={false}
              isResponse={true}
						/>
					);
				})}
		</div>
  )
}

export default IndividualResponse