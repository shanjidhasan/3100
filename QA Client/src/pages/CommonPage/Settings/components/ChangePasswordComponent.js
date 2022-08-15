import React, { useState } from "react";
import { changePassword } from "../../../../api/auth.api";
import BlueButton from "../../../../components/blueButton/BlueButton";
import Toast from "../../../../components/toast/Toast";
import { loadStorage } from "../../../../utils/persistLocalStorage";
import { createToastMessage } from "../../../../utils/toastUtil";
import "./settingsComponent.scss";
export const ChangePasswordComponent = () => {
    var user = loadStorage("user");
    const [inputs, setInputs] = useState({
        email: user.email,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [toastList, setToastList] = useState([]);
	const [position, setPosition] = useState("bottom-right");

    const handleChange = (type, event) => {
        switch (type) {
            case "oldPassword":
                setInputs({ ...inputs, oldPassword: event.target.value });
                break;
            case "newPassword":
                setInputs({ ...inputs, newPassword: event.target.value });
                break;
            case "confirmPassword":
                setInputs({ ...inputs, confirmPassword: event.target.value });
                break;
            default:
                break;
        }
    };
    const handleSubmit = async () => {
        console.log(inputs);
        if (inputs.oldPassword.length <= 0) {
			alert("Old-Password is required");
			return;
		}
		if (inputs.newPassword.length > 0 && inputs.newPassword.length < 6) {
			alert("New-Password must be at least 6 characters");
			return;
		}
		if (inputs.newPassword === inputs.oldPassword) {
			alert("Old-Password and New-Password cannot be same");
			return;
		}
		if (inputs.newPassword !== inputs.confirmPassword) {
			alert("New password and confirm password must be same");
			return;
		}
        console.log(inputs);
        await change_password(inputs);
    };

    const change_password = async (inputs) => {
        changePassword(inputs)
			.then((res) => {
                createToastMessage(
					"success",
					"Success",
					res.data.message,
					toastList,
					setToastList
				);
			})
			.catch((err) => {
                createToastMessage(
					"error",
					"Error",
					err.response.data.error,
					toastList,
					setToastList
				);
			});
    };
    return (<>  
        <div>
            <div className="changePassContainer">
                <div className="header">Change Password</div>

                <p className="text">
                    Strong password is required.Enter 8-256 characters.Do not
                    include common words or names.Combine uppercase
                    letters,lowercase letters,numbers, and symbols
                </p>

                <div className="user">User Name</div>
                <div className="user_field">
                    {user.username}
                </div>

                <div className="label">Old Password</div>
                <div className="input_container">
                    <input type="password"
                        value={inputs.oldPassword}
                        onChange={(e) => handleChange("oldPassword", e)} />
                </div>

                <div className="label">Create new password</div>
                <div className="input_container">
                    <input type="password"
                        value={inputs.newPassword}
                        onChange={(e) => handleChange("newPassword", e)} />
                </div>
                <div className="label">Confirm new password</div>
                <div className="input_container">
                    <input
                        type="password"

                        value={inputs.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e)}
                    />
                </div>

                <BlueButton btnText="Update Password" onClick={handleSubmit} />
            </div>
        </div>
        <Toast
				toastList={toastList}
				position={position}
				autoDelete={true}
				autoDeleteTime={2000}
			/>
        </>
    );
};
