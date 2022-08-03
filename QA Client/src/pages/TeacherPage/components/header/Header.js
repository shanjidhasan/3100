import {
	DashboardSharp,
	ExitToApp,
	KeyboardArrowDownRounded,
	Person,
	Settings,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { loadStorage, delStorage } from "../../../../utils/persistLocalStorage";

const Header = () => {
	const navigate = useNavigate();
	var user = loadStorage("user");

	useEffect(() => {
		user = loadStorage("user");
		if (!user || !user.token) {
			navigate("/auth/login");
		}
	}, []);

	const logoutUser = () => {
		delStorage("user");
		navigate("/");
	};

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
								<Link className="menu_item" to="/settings">
									<Settings />
									<div>Settings</div>
								</Link>
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
