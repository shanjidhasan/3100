import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/CommonPage/Authentication/LoginPage";
import RegistrationPage from "./pages/CommonPage/Authentication/RegistrationPage";
import ResetPassword from "./pages/CommonPage/Authentication/ResetPassword";
import LandingPage from "./pages/CommonPage/LandingPage/LandingPage";
import Dashboard from "./pages/CommonPage/Dashboard/Dashboard";
import TeachersProfile from "./pages/TeacherPage/Profile/TeachersProfile";
import SettingsPage from "./pages/CommonPage/Settings/SettingsPage";
import FormPage from "./pages/CommonPage/FormMaker/form_page/FormPage";
import FormPreviewPage from "./pages/CommonPage/FormMaker/form_preview_page/FormPreviewPage";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					{/* Common Routes */}
					<Route exact path="/" element={<LandingPage />} />
					<Route
						path="/auth/registration"
						element={<RegistrationPage />}
					/>
					<Route path="/auth/login" element={<LoginPage />} />

					{/* Teacher Routes */}
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path=":username" element={<TeachersProfile />} />
					<Route path="forms/:formId" element={<FormPage />} />
					<Route
						path="forms/preview/:formId"
						element={<FormPreviewPage />}
					/>
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
