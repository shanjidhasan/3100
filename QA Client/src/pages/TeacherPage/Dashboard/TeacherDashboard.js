import React, { useEffect, useState } from "react";
import "./teacherDashboard.scss";
import Header from "../components/header/Header";
import FormPage from "../../CommonPage/FormMaker/dashboard_page/FormsDashbord";

const TeacherDashboard = () => {

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
                // style={{
                //     display: "flex",
                //     flexDirection: "row",
                //     width: "90%",
                //     justifyContent: "center",
                //     alignItems: "center",
                //     paddingBottom: "150px",
                // }}
            >
               <FormPage />
            </div>
        </div>
    );
};

export default TeacherDashboard;
