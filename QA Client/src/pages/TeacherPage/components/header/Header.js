import {
	DashboardSharp,
	EventNoteRounded,
	ExitToApp,
	KeyboardArrowDownRounded,
	List,
	Person,
	Settings,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { loadStorage, delStorage } from "../../../../utils/persistLocalStorage";
import { getUUID } from "../../../../api/exam.api";

const Header = () => {
	const navigate = useNavigate();
	var user = loadStorage("user");

	useEffect(() => {
		user = loadStorage("user");
		if (!user || !user.token) {
			navigate("/auth/login");
		}
	}, []);
	const handleSubmit = async () => {
		var resp = window.prompt("Enter 8 digit exam code to participate:");
		console.log(resp);
		if(resp.length !== 8){
			alert("Invalid exam code");
			return;
		} 

		
		await enter_exam(resp);
	};

	const enter_exam = async (sub_uuid) => {
		getUUID({
			token: user.token,
			sub_uuid: sub_uuid,
			})
			.then((res) => {
				console.log(res.data.data);
				navigate(`/forms/view/${res.data.data.uuid}`);
			}
			)
			.catch((err) => {
				console.log(err.response);
				alert(err.response.data.error);
			}
		);
	};

	const logoutUser = () => {
		delStorage("user");
		navigate("/");
	};
	console.log(user.id, "user");

	const [openOption, setOpenOption] = useState(false);

	return (
		<div className="header_container">
			<div className="header_middle">
				<Link to="/dashboard">
					<img
						className="logo"
						src={require("./../../../../media/images/TSCDemoLogo.png")}
						alt="Logo"
					/>
				</Link>
			</div>
			<div className="header_right">
				<div className="header_profile_tile">
					<div
						className="header_profile_tile_Content"
						onClick={() => setOpenOption(!openOption)}
					>
						<div className="profile_pic">
							<img
								src={user.profile_picture}
								alt="profile"
								height={45}
								width={45}
							/>
						</div>
						<div className="name dropdown">
							<div className="name_text">
								{user
									? user.first_name + " " + user.last_name
									: ""}
							</div>
							{/* <div className="role_text">Teacher</div> */}
						</div>
						<div className="dropdown">
							<div className="headerIcon">
								<KeyboardArrowDownRounded className="dropdown_icon" />
							</div>
						</div>
					</div>
					{openOption && (
						<div className="header_profile_tile_options">
							<div className="dropdown-content">
								<Link className="menu_item" to="/dashboard">
									<DashboardSharp />
									<div>Dashboard</div>
								</Link>
								<Link
									className="menu_item"
									to={"/" + user.username}
								>
									<Person />
									<div>Profile</div>
								</Link>
								<Link
									className="menu_item"
									to="/responses"
								>
									<List />
									<div>Responses</div>
								</Link>
								<Link className="menu_item" to="/settings">
									<Settings />
									<div>Settings</div>
								</Link>
								<div className="menu_item" onClick={handleSubmit}>
									<EventNoteRounded />
									<div >Join Exam</div>
								</div>
								<div className="menu_item" onClick={logoutUser}>
									<ExitToApp />
									<div>Logout</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
