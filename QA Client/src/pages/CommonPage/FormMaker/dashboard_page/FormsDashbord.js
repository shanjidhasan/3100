import React from "react";
import StartNewForm from "../../../../components/start_new_form/StartNewForm";
import FormList from "../../../../components/form/form_list/FormList";
import { loadStorage } from "../../../../utils/persistLocalStorage";
import { useNavigate } from "react-router-dom";

function FormsDashbord() {
    var user = loadStorage("user");

    const navigate = useNavigate();

    return (
        <div>
            <StartNewForm user={user} navigate={navigate}/>
			<FormList user={user} />
        </div>
    );
}

export default FormsDashbord;
