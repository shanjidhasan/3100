import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/CommonPage/Authentication/LoginPage";
import ResetPassword from "./pages/CommonPage/Authentication/ResetPassword";
import RegistrationPage from "./pages/CommonPage/Authentication/RegistrationPage";
import LandingPage from "./pages/CommonPage/LandingPage/LandingPage";
import Dashboard from "./pages/CommonPage/Dashboard/Dashboard";
import TeachersProfile from "./pages/TeacherPage/Profile/TeachersProfile";
import SettingsPage from "./pages/CommonPage/Settings/SettingsPage";
import FormPage from "./pages/CommonPage/FormMaker/form_page/FormPage";
import FormPreviewPage from "./pages/CommonPage/FormMaker/form_preview_page/FormPreviewPage";
import IndividualResponse from "./pages/TeacherPage/Responses/IndividualResponse";
import ResponseList from "./pages/TeacherPage/Responses/ResponseList";
import MyResponses from "./pages/TeacherPage/Responses/MyResponses";

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
					<Route path="/auth/reset-password" element={<ResetPassword/>} />

					{/* Teacher Routes */}
					<Route path="dashboard" element={<Dashboard />} />
					<Route path=":username" element={<TeachersProfile />} />
					<Route path="forms/edit/:formId" element={<FormPage />} />
					<Route
						path="forms/view/:formId"
						element={<FormPreviewPage />}
					/>
					<Route
						path="forms/responses/:formId"
						element={<ResponseList />}
					/>
					<Route
						path="forms/response/:formId/:userId"
						element={<IndividualResponse />}
					/>
					<Route
						path="responses"
						element={<MyResponses />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
