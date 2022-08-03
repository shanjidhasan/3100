import React from "react";
import { loadStorage } from "../../../../utils/persistLocalStorage";
import "./settingsComponent.scss";
export const ChangePasswordComponent = () => {
    var user = loadStorage("user");
    console.log(user);
    return (
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
                    {user.first_name} {user.last_name}
                </div>

                <div className="label">Old Password</div>
                <div className="input_container">
                    <input type="password" />
                </div>

                <div className="label">Create new password</div>
                <div className="input_container">
                    <input type="password" />
                </div>
                <div className="label">Confirm new password</div>
                <div className="input_container">
                    <input
                        type="password"
                        //show password
                    />
                </div>

                <button classsName="saveButton">Update changes</button>
            </div>
        </div>
    );
};
