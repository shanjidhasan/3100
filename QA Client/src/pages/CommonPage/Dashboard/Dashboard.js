import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherDashboard from "../../TeacherPage/Dashboard/TeacherDashboard";
import { loadStorage } from "../../../utils/persistLocalStorage";

const Dashboard = () => {
	const navigate = useNavigate();
	var user = loadStorage("user");

	useEffect(() => {
		user = loadStorage("user");
		if (!user || !user?.token) {
			navigate("/auth/login");
		}
	}, [user]);

	return (
				<TeacherDashboard />
		
	);
};

export default Dashboard;
