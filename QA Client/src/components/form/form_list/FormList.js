import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams } from "../../../api/exam.api";
import { delStorage } from "../../../utils/persistLocalStorage";
import { formatDateTime } from "../../../utils/utility";
import "./formList.scss";

function FormList({user}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        getAllExams({token: user.token})
            .then((res) => {
                console.log(res.data.data);
                setFormData(res.data.data);
            })
            .catch((err) => {
                console.log(err.response);
                if (err.response.status === 401) {
                    delStorage("user");
                    navigate("/auth/login");
                }
            });
    }, []);

    const handleOnClick = (uuid) => {
        console.log(uuid);
        navigate(`/forms/edit/${uuid}`);
    };

    return (
        <div className="form_list_container">
            <div className="title">
                <span>Recent Forms</span>
            </div>
            <div className="form_list">
                {formData.map((form, index) => {
                    return (
                        <div
                            className="form_item"
                            key={index}
                            onClick={() => {
                                handleOnClick(form.uuid);
                            }}
                        >
                            <div className="form_thumbnail">
                                <img src="https://icons.iconarchive.com/icons/carlosjj/google-jfk/128/forms-icon.png" alt="template" />
                            </div>

                            <div className="form_footer">
                                <div className="form_name">
                                    <span>{form.title}</span>
                                </div>

                                <div className="form_options">
                                    <div className="form_options_left">
                                        <div className="form_icon">
                                            <img
                                                src="https://www.gstatic.com/images/branding/product/1x/forms_48dp.png"
                                                alt="forms logo"
                                            />
                                        </div>
                                        <div className="form_opened">
                                            <span>Opened {formatDateTime(form.updated_at)}</span>
                                        </div>
                                    </div>
                                    <div className="form_options_right">
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FormList;
