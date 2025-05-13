import logo from '../assets/img/logo.png';
import * as React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from '../components/ui/Footer';

// Only for Landing and childs thats why it is same file on Landing
const Header: React.FC = () => {

	const location = useLocation();

	return (
		<header className="landing-header">
			<div className="logo">
				<img src={logo} alt="Logo" height={30} />
				<h1 className="site-title">JTech Mailer</h1>
			</div>

			<nav className="nav-links">
				<Link className={`nav-link ${location.pathname === '/' && 'active'}`} to="/">Home</Link>
				<Link className={`nav-link ${location.pathname === '/get-started' && 'active'}`} to="/get-started">Get Started</Link>
				<Link className={`nav-link ${location.pathname === '/about-us' && 'active'}`} to="/about-us">About Us</Link>
			</nav>

			<div className="auth-actions">
				<Link className="cta" to="/auth/sign-in">Sign In</Link>
			</div>
		</header>
	);
}

// Landing Component
const Landing: React.FC = () => {
	return (
		<div className="landing">
			<Header />

			<div className="outlet-container">
				<Outlet />
			</div>

			<Footer />
		</div>
	);
};

export default Landing;
