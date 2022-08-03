import React from "react";
import Lottie from "lottie-react";
import "./landingPageStyle.scss";
import { loadStorage } from "../../../utils/persistLocalStorage";
import Learning from "../../../media/lottie-anims/learning.json";
import Leaderboard from "../../../media/lottie-anims/leaderboard.json";
import Community from "../../../media/lottie-anims/community.json";
import BlueLinkButton from "../../../components/blueLinkButton/BlueLinkButton";

import Footer from './Footer';

const LandingPage = () => {
	const user = loadStorage("user");

	return (
		<div className="landingPageContainer">
			<div className="landingPageHeader">
				<div className="landingPageHeaderLogo">
					<img
						className="landingPageHeaderLogoImg"
						src={require("./../../../media/images/TSCDemoLogo.png")}
						alt="Logo"
					/>
				</div>
				<div className="landingPageHeaderAppName">
					<h5>QuickAssessment</h5>
				</div>
				<div className="landingPageHeaderBtn">
					{user ? (
						<BlueLinkButton
							btnText="Dashboard"
							btnLink="/dashboard"
						/>
					) : (
						<BlueLinkButton btnText="Login" btnLink="/auth/login" />
					)}
					<div />
				</div>
			</div>

			<div className="landingPageBody">
				<div className="section">
					<div className="sectionLeft">
						<span className="sectionTitle">Learning Is Fun!</span>
						<span className="sectionSubtitle">
							Start learning anything you want.
							<br />
							Be the best. Make the world a better place!
						</span>
						<br />
						{!user && (
							<BlueLinkButton
								btnText="Join Us"
								btnLink="/auth/registration"
							/>
						)}
					</div>
					<div
						className="sectionRight"
						style={{
							height: "50vh",
						}}
					>
						<Animation
							className="sectionImg"
							animationData={Learning}
						/>
					</div>
				</div>

				{/* <div className="sponsors">
					<h1>Our Sponsors</h1>
					<div className="landingPageTopHeaderSponsors">
						Logo Logo Logo Logo Logo Logo Logo
					</div>
				</div> */}
				<div className="thinBlueLine"></div>

				<div className="section">
					<div
						className="sectionLeft"
						style={{
							height: "50vh",
						}}
					>
						<Animation
							className="sectionImg"
							animationData={Leaderboard}
						/>
					</div>
					<div className="sectionRight">
						<span className="sectionTitle">Leaderboard</span>
						<span className="sectionSubtitle">
							Show your learning skills and become a top scorer
							<br />
							among thousands of other students and get exiting
							rewards.
						</span>
					</div>
				</div>

				<div className="section">
					<div className="sectionLeft">
						<span className="sectionTitle">Community</span>
						<span className="sectionSubtitle">
							Build a Community of learners and experts.
						</span>
					</div>
					<div
						className="sectionRight"
						style={{
							height: "80vh",
						}}
					>
						<Animation
							className="sectionImg"
							animationData={Community}
						/>
					</div>
				</div>
			</div>

			<div className="landingPageBottom">
				{/* <div className="bottomDiv">Welcome</div>

				<div className="bottomDiv">About</div>

				<div className="bottomDiv">Products</div> */}
				<Footer />
			</div>
		</div>
	);
};

const Animation = (props) => {
	const { animationData, loop, autoplay, height, width } = props;

	return (
		<Lottie
			animationData={animationData}
			loop={loop ? loop : true}
			autoplay={autoplay ? autoplay : true}
			height={height ? height : "100%"}
			width={width ? width : "100%"}
		/>
	);
}

export default LandingPage;
