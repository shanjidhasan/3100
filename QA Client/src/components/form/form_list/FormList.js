import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExams } from "../../../api/exam.api";
import { delStorage } from "../../../utils/persistLocalStorage";
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
        navigate(`/forms/${uuid}`);
    };

    const formatDateTime = (dueDateTime) => {
        const date = new Date(dueDateTime);
        const day = date.getDate();
        const monthList = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const textMonth = monthList[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12;
        const sHours = hour12 < 10 ? `0${hour12}` : hour12;
        const sMinutes = minute < 10 ? `0${minute}` : minute;
        const formattedTime = `${sHours}:${sMinutes} ${ampm}`;
        return `${textMonth} ${day}, ${year}`;
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
                                <img src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png" alt="template" />
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
