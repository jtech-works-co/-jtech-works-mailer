import * as React from "react";
import { Link, Outlet } from "react-router-dom";

// Landing Component
const Landing: React.FC = () => {
	return (
		<div className="landing">
			<header className="landing-header">
				<div className="logo">
					<Link className="site-title" to='/'>JTech Mailer</Link>
				</div>

				<nav className="nav-links">
					<Link className="nav-link" to="/get-started">Get Started</Link>
					<Link className="nav-link" to="/about-us">About Us</Link>
				</nav>

				<div className="auth-actions">
					<Link className="cta" to="/auth/sign-up">Sign Up</Link>
				</div>
			</header>

			<div className="outlet-container">
				<Outlet />
			</div>
		</div>
	);
};

export default Landing;
