import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.scss";
import BlueButton from "../../../components/blueButton/BlueButton";
import InputField from "../../../components/inputField/InputField";
import FormError from "../../../components/formError/FormError";
import {
	getResetPasswordCode,
	resetPassword,
	verifyResetPasswordCode,
} from "../../../api/auth.api";
import Toast from "../../../components/toast/Toast";
import { createToastMessage } from "../../../utils/toastUtil";

function ResetPassword() {
	const [email, setEmail] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otpCode, setOtpCode] = useState("");
	const [otpVerified, setOtpVerified] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [resetSuccessful, setResetSuccessful] = useState(false);
	const [formError, setFormError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [toastList, setToastList] = useState([]);
	const [position, setPosition] = useState("bottom-right");
	const navigate = useNavigate();

	const handleEmailSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		getResetPasswordCode({ email })
			.then((res) => {
				alert("OTP sent to your email");
				setOtpSent(true);
				setIsLoading(false);
				createToastMessage(
					"success",
					res.data.message,
					setToastList,
					setPosition
				);
			})
			.catch((err) => {
				alert("Error sending OTP");
				setIsLoading(false);
			});
	};

	const handleOTPSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		verifyResetPasswordCode({ code: otpCode, email: email })
			.then((res) => {
				alert("OTP verified");
				setOtpVerified(true);
				setIsLoading(false);
			})
			.catch((err) => {
				alert("Error verifying OTP");
				setIsLoading(false);
			});
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		if (newPassword !== confirmPassword) {
			setFormError("Passwords do not match");
			setIsLoading(false);
			return;
		}
		resetPassword({
			email,
			newPassword,
			confirmPassword,
		})
			.then((res) => {
				setResetSuccessful(true);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	const goToLogin = () => {
		navigate("/auth/login");
	};

	return (<>
		<div className="wrapper">
			<div className="container ">
				<div className="leftContainer">
					{!resetSuccessful ? (
						<img
							className="resetPassLogo"
							src={require("./../../../media/images/forgot_password.png")}
							alt="Logo"
						/>
					) : (
						<img
							className="resetPassLogo"
							src={require("./../../../media/images/reset_done.png")}
							alt="Logo"
						/>
					)}
				</div>
				<div className="rightContainer">
					{!otpSent ? (
						<form className="rightContainerForm">
							<div className="formTitle">Reset Password</div>
							<InputField
								type="email"
								name="email"
								placeholder="Email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>

							<BlueButton
								btnText="Verify Email"
								onClick={handleEmailSubmit}
							/>

							{formError && <FormError error={formError} />}
						</form>
					) : null}

					{otpSent && !otpVerified ? (
						<form className="rightContainerForm">
							<div className="formTitle">Reset Password</div>
							<InputField
								type="number"
								name="otpCode"
								placeholder="OTP Code"
								onChange={(e) => {
									setOtpCode(e.target.value);
								}}
							/>

							<BlueButton
								btnText="Verify OTP"
								onClick={handleOTPSubmit}
							/>

							{formError && <FormError error={formError} />}
						</form>
					) : null}

					{otpSent && otpVerified && !resetSuccessful ? (
						<form className="rightContainerForm">
							<div className="formTitle">Reset Password</div>
							<InputField
								type="password"
								name="newPassword"
								placeholder="Enter New Password"
								onChange={(e) => {
									setNewPassword(e.target.value);
								}}
							/>
							<InputField
								type="password"
								name="confirmPassword"
								placeholder="Re-enter New Password"
								value={confirmPassword}
								onChange={(e) => {
									setConfirmPassword(e.target.value);
								}}
							/>

							<BlueButton
								btnText="Submit"
								onClick={handlePasswordSubmit}
							/>

							{formError && <FormError error={formError} />}
						</form>
					) : null}

					{resetSuccessful ? (
						<div className="resetSuccess">
							<div className="resetSuccessTitle">
								Password Reset Successful
							</div>
							<div className="resetSuccessText">
								You can now login with your new password.
							</div>

							<BlueButton
								btnText="Go back to login"
								onClick={goToLogin}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
		<Toast
		toastList={toastList}
		position={position}
		autoDelete={true}
		autoDeleteTime={2000}
	/></>
	);
}

export default ResetPassword;
