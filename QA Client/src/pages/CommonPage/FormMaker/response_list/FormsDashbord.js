import React from "react";
import StartNewForm from "../../../../components/start_new_form/StartNewForm";
import FormList from "../../../../components/form/form_list/FormList";
import { loadStorage } from "../../../../utils/persistLocalStorage";
import { useNavigate } from "react-router-dom";
import Header from "../../../TeacherPage/components/header/Header";

function FormsDashbord() {
    var user = loadStorage("user");

    const navigate = useNavigate();

    return (
        <div>
            <div className="headerContainer">
                <Header />
            </div>
			<FormList user={user} />
        </div>
    );
}

export default FormsDashbord;
