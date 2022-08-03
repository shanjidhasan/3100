import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser, verifyUser } from "../../../api/auth.api";
import BlueButton from "../../../components/blueButton/BlueButton";
import { loadStorage, saveStorage } from "../../../utils/persistLocalStorage";
import InputField from "../../../components/inputField/InputField";
import { EMAILREGEX } from "../../../utils/constants";
import "./auth.scss";
import CheckboxField from "../../../components/inputField/CheckboxField";
import FormError from "../../../components/formError/FormError";

const RegistrationPage = () => {
	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		asTeacher: false,
		asStudent: false,
		asGuardian: false,
		asSchoolAdmin: false,
	});
	const [dataSubmitted, setDataSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formError, setFormError] = useState(null);

	const navigate = useNavigate();
	var user = loadStorage("user");

	useEffect(() => {
		if (user && user.token) {
			console.log(user);
			navigate("/dashboard");
		}
	}, []);

	useEffect(() => {
		if (dataSubmitted) {
			navigate("/auth/login");
		}
	}, [dataSubmitted]);

	const handleChange = (type, event) => {
		switch (type) {
			case "firstName":
				setInputs({ ...inputs, firstName: event.target.value });
				break;
			case "lastName":
				setInputs({ ...inputs, lastName: event.target.value });
				break;
			case "username":
				setInputs({ ...inputs, username: event.target.value });
				break;
			case "email":
				setInputs({ ...inputs, email: event.target.value });
				break;
			case "password":
				setInputs({ ...inputs, password: event.target.value });
				break;
			case "confirmPassword":
				setInputs({ ...inputs, confirmPassword: event.target.value });
				break;

			default:
				break;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true);

		if (inputs.firstName.length <= 0) {
			setFormError("First name is required");
			return;
		}
		if (inputs.lastName.length <= 0) {
			setFormError("Last name is required");
			return;
		}
		if (inputs.username.length <= 0) {
			setFormError("Username is required");
			return;
		}
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
		if (inputs.password.length < 6) {
			setFormError("Password must be at least 6 characters");
			return;
		}
		if (inputs.password !== inputs.confirmPassword) {
			setFormError("Passwords do not match");
			return;
		}
		if (
			!inputs.asTeacher &&
			!inputs.asStudent &&
			!inputs.asGuardian &&
			!inputs.asSchoolAdmin
		) {
			setFormError("Please select at least one role");
			return;
		}
		setFormError(null);

		console.log(inputs);
		signUpUser(inputs)
			.then((res) => {
				console.log(res);
				saveStorage("user", JSON.stringify(res.data.data["user"]));
				setDataSubmitted(true);
				setIsLoading(false);
			})
			.catch((err) => {
				setFormError(err.response.data.error);
				setIsLoading(false);
			});
	};

	return (
		<div className="wrapper">
			<div className="container">
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
					<form className="rightContainerForm">
						<div className="formTitle">Sign Up</div>
						<InputField
							type="text"
							name="firstName"
							placeholder="First Name"
							onChange={(e) => handleChange("firstName", e)}
						/>
						<InputField
							type="text"
							name="lastName"
							placeholder="Last Name"
							onChange={(e) => handleChange("lastName", e)}
						/>
						<InputField
							type="text"
							name="username"
							placeholder="Username"
							onChange={(e) => handleChange("username", e)}
						/>
						<InputField
							type="email"
							name="email"
							placeholder="Email Address"
							onChange={(e) => handleChange("email", e)}
						/>
						<InputField
							type="password"
							name="password"
							placeholder="Password"
							onChange={(e) => handleChange("password", e)}
						/>
						<InputField
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							onChange={(e) => handleChange("confirmPassword", e)}
						/>
						

						<BlueButton btnText="Sign Up" onClick={handleSubmit} />

						<div className="formFooter">
							<span>
								Already have an account?{" "}
								<Link to="/auth/login" className="noDecoration">
									Login
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

export default RegistrationPage;
