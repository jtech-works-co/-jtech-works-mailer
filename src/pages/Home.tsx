import * as React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {

	const navigate = useNavigate();

	const handleNavigate = (path: string) => {
		navigate(path);
	}

	return (
		<div className="home">
			<div className="hero-section">
				<h1 className="site-title">JTech Mailer</h1>
				<p className="site-subtitle">
					Secure and reliable email campaign management for modern businesses.
				</p>
				<div className="cta-buttons">
					<button className="cta" onClick={() => handleNavigate('/auth/sign-up')}>Get Started</button>
					<button className="cta" onClick={() => handleNavigate('/auth/sign-in')}>Log In</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
