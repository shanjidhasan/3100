import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './responseList.css';
import { get_all_responses_by_exam_id } from '../../../api/exam.api';
import { loadStorage } from '../../../utils/persistLocalStorage'

const ResponseList = () => {
    // /get uuid from url
    const uuid = window.location.pathname.split('/')[3]

    const [responses, setResponses] = useState([])

    var user = loadStorage("user");
    const navigate = useNavigate();

    useEffect(() => {
        // get response list
        get_all_responses_by_exam_id({ token: user.token, uuid: uuid })
            .then((res) => {
                console.log(res.data)
                setResponses(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            });

    }, [])
    
    return (
        <div>
            <h1>ResponseList</h1>
            <div>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Points</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            responses.map((response, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{response.student.username}</td>
                                        <td>{response.obtained_marks}</td>
                                        <td>
                                            <Link to={`/forms/response/${uuid}/${response.student.id}`}>
                                            <i class="fa fa-eye"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ResponseList