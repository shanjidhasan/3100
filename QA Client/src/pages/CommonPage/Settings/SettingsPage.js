import {
    Gavel,
    HelpOutline,
    Info,
    PersonTwoTone,
    PolicyTwoTone,
    SecurityTwoTone,
    SettingsTwoTone,
} from "@material-ui/icons";
import React, { useState } from "react";
import Header from "../../TeacherPage/components/header/Header";
import { ChangePasswordComponent } from "./components/ChangePasswordComponent";
import HelpAndSupport from "./components/HelpAndSupport";
import Account from "./components/Account";
import About from "./components/About";
import TandC from "./components/TandC";
import PP from "./components/PP";
import PublicProfileComponent from "./components/PublicProfileComponent";
import "./settingsPage.scss";

export default function SettingsPage() {
    const [selectedOption, setSelectedOption] = useState("#profile");

    const selectOptionHandler = (inp) => {
        console.log(inp);
        setSelectedOption(inp);
    };

    return (
        <div className="settingsContainer">
            <div className="headerContainer">
                <Header />
            </div>
            {/* <div>Your Profile</div> */}
            <div className="settingsBodyContainer">
                <div className="settingsBodyLeftContainer">
                    <div
                        onClick={() => {
                            selectOptionHandler("#help");
                        }}
                    >
                        <HelpOutline className="icon" /> Help & Support
                    </div>
                    {/* <div
                        onClick={() => {
                            selectOptionHandler("#profile");
                        }}
                    >
                        <PersonTwoTone className="icon" /> Public Profile
                    </div> */}
                    <div
                        onClick={() => {
                            selectOptionHandler("#Account");
                        }}
                    >
                        <SettingsTwoTone className="icon" /> Account
                    </div>
                    <div
                        onClick={() => {
                            selectOptionHandler("#pass&auth");
                        }}
                    >
                        <SecurityTwoTone className="icon" /> Password and
                        Authentication
                    </div>

                    <hr className="thin_line" />
                    <div
                        onClick={() => {
                            selectOptionHandler("#about");
                        }}
                    >
                        <Info className="icon" />
                        About
                    </div>
                    <div
                        onClick={() => {
                            selectOptionHandler("#terms&cons");
                        }}
                    >
                        <Gavel className="icon" /> Terms & Conditions
                    </div>
                    <div
                        onClick={() => {
                            selectOptionHandler("#PrivacyPolicy");
                        }}
                    >
                        <PolicyTwoTone className="icon" /> Privacy Policy
                    </div>
                </div>
                <div className="settingsBodyRightContainer">
                    {/* {selectedOption} */}
                    {/* {selectedOption === "#profile" && (
                        <PublicProfileComponent />
                    )} */}
                    {selectedOption === "#pass&auth" && (
                        <ChangePasswordComponent />
                    )}

                    {selectedOption === "#help" && <HelpAndSupport />}
                    {selectedOption === "#Account" && <Account />}
                    {selectedOption === "#about" && <About />}
                    {selectedOption === "#terms&cons" && <TandC />}
                    {selectedOption === "#PrivacyPolicy" && <PP />}
                </div>
            </div>
        </div>
    );
}
