import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.scss";
import { EMAILREGEX } from "../../../utils/constants";
import { loadStorage, saveStorage } from "../../../utils/persistLocalStorage";
import { loginUser } from "../../../api/auth.api";
import InputField from "../../../components/inputField/InputField";
import FormError from "../../../components/formError/FormError";
import BlueButton from "../../../components/blueButton/BlueButton";

const LoginPage = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const [formError, setFormError] = useState(null);

	const navigate = useNavigate();
	var user = loadStorage("user");

	useEffect(() => {
		user = loadStorage("user");
		if (user && user.token) {
			// console.log(user);
			navigate("/dashboard");
		}
	}, []);

	const handleChange = (type, event) => {
		switch (type) {
			case "email":
				setInputs({ ...inputs, email: event.target.value });
				break;
			case "password":
				setInputs({ ...inputs, password: event.target.value });
				break;
			default:
				break;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (inputs.email.length <= 0) {
			setFormError("Email is required");
			return;
		}
		if (inputs.email.length > 0 && !EMAILREGEX.test(inputs.email)) {
			setFormError("Email is not valid");
			return;
		}
		if (inputs.password.length <= 0) {
			setFormError("Password is required");
			return;
		}
		if (inputs.password.length > 0 && inputs.password.length < 6) {
			setFormError("Password must be at least 6 characters");
			return;
		}
		setFormError(null);
		await userLogin(inputs);
	};

	const userLogin = async (inputs) => {
		console.log(inputs);
		loginUser(inputs)
			.then((res) => {
				saveStorage("user", res.data.data["user"]);
				navigate("/dashboard");
			})
			.catch((err) => {
				setFormError(err.response["data"]["message"]);
			});
	};

	return (
		<div className="wrapper">
			<div className="container ">
				<div className="leftContainer">
					<img
						className="leftContainerLogo"
						src={require("./../../../media/images/TSCDemoLogo.png")}
						alt="Logo"
					/>
					<div className="leftContainerText">
						Welcome To{" "}
						<Link
							to="/"
							style={{
								textDecoration: "none",
								color: "inherit",
								fontWeight: "bold",
								fontSize: "1.5rem",
							}}
						>
							QuickAssessment
						</Link>
						, a platform that helps teachers to assess all the students within a very short time during the classes.
					</div>
				</div>
				<div className="rightContainer">
					<form
						onSubmit={handleSubmit}
						className="rightContainerForm"
					>
						<div className="formTitle">Login</div>
						<InputField
							type="email"
							name="email"
							placeholder="Email"
							value={inputs.email}
							onChange={(e) => handleChange("email", e)}
						/>

						<InputField
							type="Password"
							name="password"
							placeholder="Password"
							value={inputs.password}
							onChange={(e) => handleChange("password", e)}
						/>

						<div className="forgotPassword">
							<Link
								to="/auth/reset-password"
								className="noDecoration"
							>
								Forgot Password?
							</Link>
						</div>

						

						<BlueButton btnText="Login" onClick={handleSubmit} />

						<div className="formFooter">
							<span>
								Don't have an account?{" "}
								<Link
									to="/auth/registration"
									className="noDecoration"
								>
									Sign Up
								</Link>
							</span>
						</div>

						{formError && <FormError error={formError} />}
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
