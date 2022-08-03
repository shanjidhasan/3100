import {
	BookOutlined,
	Close,
	EmailOutlined,
	Facebook,
	GradeOutlined,
	Group,
	InfoOutlined,
	LinkOffOutlined,
	Room,
	SchoolOutlined,
	StarBorderOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	getUserDetails,
	getUserDetailsByUsername,
	updateUser,
} from "../../../api/user.api";
import { delStorage, loadStorage, saveStorage } from "../../../utils/persistLocalStorage";
import { MAT_URL } from "../../../utils/urls";
import Header from "../components/header/Header";
import "./TeachersProfile.scss";

const TeachersProfile = () => {
	var user = loadStorage("user");
	const navigate = useNavigate();

	// get the username from the url
	const [username, setUsername] = useState(
		window.location.pathname.split("/")[1]
	);
	const [ownProfile, setOwnProfile] = useState(false);

	const [userDetails, setUserDetails] = useState({});
	const [forms, setForms] = useState([]);
	const [editProfile, setEditProfile] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		user = loadStorage("user");
		if (!user) {
			navigate("/auth/login");
		}
		if (user.username === username) {
			setOwnProfile(true);
		} else {
			setOwnProfile(false);
		}

		setUsername(username);
		getUserDetailsByUsername({
			username: username,
			userId: user.id,
			token: user.token,
		})
			.then((res) => {
				console.log(res.data.data);
				setUserDetails(res.data.data["user"]);
				setForms(res.data.data["forms"]);
				setIsLoading(false);
				setError(null);
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response.status === 401) {
					delStorage("user");
					navigate("/auth/login");
				}
				setIsLoading(false);
				setError(err.response.data.error);
			});
	}, [username]);

	return (
		<div>
			{isLoading ? (
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			) : error ? (
				<div className="error-container">
					<div className="error-message">{error}</div>
				</div>
			) : (
				<>
					<div className="teachers_profile_container">
						<div className="teachers_profile_header_container">
							<Header />
						</div>
						<div className="teachers_profile_body_container">
							<div className="teachers_profile_body_left_container">
								<img
									className="teachers_profile_body_left_image"
									src={user.profile_picture}
									alt="img"
								/>

								<div className="teachers_profile_card">
									<div className="teachers_name">
										{userDetails &&
											userDetails.first_name +
											" " +
											userDetails.last_name}
									</div>
									<div className="teachers_info">
										{"@" + username}
									</div>
									<div className="teachers_info">
										Email:{" "}
										{userDetails && userDetails?.email}
									</div>
									{userDetails.phone && (
										<div className="teachers_info">
											Phone:{" "}
											{userDetails && userDetails?.phone}
										</div>
									)}

									<div className="teachers_profile_card_edit_info">
										{userDetails.address && (
											<div
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent:
														"flex-start",
													alignItems: "flex-start",
												}}
											>
												<Room className="icon" />
												{userDetails.address}
											</div>
										)}
									</div>

									{!editProfile && ownProfile && (
										<div
											className="Edit_profile_btn"
											onClick={() =>
												setEditProfile(!editProfile)
											}
										>
											Edit Your Profile
										</div>
									)}
								</div>
							</div>

							<div className="teachers_profile_body_right_container">
								<div className="courses">
									<div
										className="courses_body"
										style={{
											width: "100%",
										}}
									>
										<div className="courses_header">
											📚 Forms
										</div>

										{/* {JSON.stringify(courses)} */}
										<div className="courses_card_container">
											{forms.map((form) => {
												return (
													<div className="course_card">
														<img
															style={{
																height: "100px",
																width: "100px",
																objectFit:
																	"contain",
															}}
															src=
															"https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png"

														/>
														<hr />
														<div className="course_name_holder">
															{
																form.title
															}
														</div>

														<div className="course_name_holder">
															{
																form.details
															}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
								{/* <hr /> */}
								<div className="about_teacher">
									<div className="about_teacher_header">
										👨‍🎓 About me
									</div>
									<div className="about_teacher_body">
										{userDetails.about_me && (
											<div className="about_teacher_body_text">
												{userDetails.about_me}
											</div>
										)}
									</div>
								</div>
								{/* <hr /> */}
							</div>
						</div>
					</div>

					{editProfile && (
						<EditProfilePopUp
							setEditProfile={setEditProfile}
							userDetails={userDetails}
							setUserDetails={setUserDetails}
							user={user}
						/>
					)}
				</>
			)}
		</div>
	);
};

const EditProfilePopUp = ({
	setEditProfile,
	userDetails,
	setUserDetails,
	user,
}) => {
	const [address, setAddress] = useState(userDetails.address);
	const [phone, setPhone] = useState(userDetails.phone);
	const [bio, setBio] = useState(userDetails.about_me);
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		updateUser({
			token: user.token,
			userId: userDetails.id,
			address: address,
			phone: phone,
			bio: bio,
		})
			.then((res) => {
				console.log(res.data.data);
				var newUser = res.data.data;
				delStorage("user");
				saveStorage("user", res.data.data);
				setUserDetails(newUser);
				setEditProfile(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="popup_container">
			<div className="action_row">
				<div className="action_row_left">
					<InfoOutlined
						onClick={() => {
							alert(
								"You can use this window to edit your profile"
							);
						}}
						style={{
							fontSize: "2.5rem",
							cursor: "pointer",
						}}
					/>
				</div>
				<div className="action_row_right">
					<Close
						onClick={() => {
							setEditProfile(false);
						}}
						style={{
							fontSize: "2.5rem",
							cursor: "pointer",
						}}
					/>
				</div>
			</div>

			<div className="popup_title">
				<h2>Update Profile</h2>
			</div>

			<div className="form">
				<div className="popup_form_field">
					<label>Phone</label>
					<input
						type="text"
						title="Write your phone number here"
						placeholder="Phone Number"
						value={phone}
						onChange={(e) => {
							setPhone(e.target.value);
						}}
					/>
				</div>

				<div className="popup_form_field">
					<label>Address</label>
					<input
						type="text"
						title="Write your address here"
						placeholder="Address"
						value={address}
						onChange={(e) => {
							setAddress(e.target.value);
						}}
					/>
				</div>

				<div className="popup_form_field">
					<label>About You</label>
					<textarea
						title="Write something about yourself"
						placeholder="About Yourself"
						value={bio}
						onChange={(e) => {
							setBio(e.target.value);
						}}
					></textarea>
				</div>

				<div className="popup_error">{error && <p>{error}</p>}</div>
			</div>

			<div className="popup_btn_row">
				<span
					className="popup_btn"
					title="Update your data"
					onClick={handleSubmit}
				>
					Update
				</span>

				<span
					className="popup_btn"
					title="Go back to profile"
					onClick={() => {
						setEditProfile(false);
					}}
				>
					Cancel
				</span>
			</div>
		</div>
	);
}

export default TeachersProfile;
