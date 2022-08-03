import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/nav/Navbar";
import "./teacherDashboard.scss";
import Header from "../components/header/Header";
import HomePage from "../nav_home/HomePage";
import ChatPage from "../nav_chat/ChatPage";
import ClassPage from "../nav_class/class_wise_subjects/ClassPage";

const TeacherDashboard = () => {
    const [activePage, setActivePage] = useState("#homePage");
    const setActivePageFunction = (tag) => {
        setActivePage(tag);
        localStorage.setItem("activePage", tag);
    };
    const navigate = useNavigate();
    var user = localStorage.getItem("user");

    useEffect(() => {
        user = localStorage.getItem("user");
        if (!user) {
            navigate("/auth/login");
        }
        if (
            localStorage.getItem("activePage") === "" ||
            localStorage.getItem("activePage") === null
        ) {
            setActivePage("#homePage");
            localStorage.setItem("activePage", activePage);
        } else {
            setActivePage(localStorage.getItem("activePage"));
            localStorage.setItem(
                "activePage",
                localStorage.getItem("activePage")
            );
        }
    }, [activePage]);

    return (
        <div className="admin__dashboard">
            <div
                style={{
                    width: "100%",
                    justifyContentc: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0px 0px 10px #00000029",
                }}
            >
                <Header />
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "150px",
                }}
            >
                <div
                    style={{
                        width: "80vw",
                    }}
                >
                    {activePage === "#homePage" && <HomePage />}
                    {activePage === "#classPage" && <ClassPage />}
                    {activePage === "#CreateFormPage" && <ChatPage />}
                    {activePage === "#chatPage" && <ChatPage />}
                </div>
                <Navbar
                    setActivePage={setActivePageFunction}
                    activePage={activePage}
                />
            </div>
        </div>
    );
};

export default TeacherDashboard;
