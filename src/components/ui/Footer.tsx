import * as React from "react";
import logo from './../../assets/img/logo.png';
import githubIcon from './../../assets/img/github-icon.png';
import facebookIcon from './../../assets/img/facebook-icon.png';

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<img src={logo} alt="" width={40} />

			<div className="social-container">
				<a className="link" target="_blank" rel="noreferrer" href="https://web.facebook.com/profile.php?id=61575880379230">
					<img src={facebookIcon} alt="" />
				</a>
				<a href="https://github.com/jtech-works-co" className="link" target="_blank" rel="noreferrer">
					<img src={githubIcon} alt="" />
				</a>
			</div>

			<div className="copy-right">
				<p className="footer-copy">&copy; 2025 - {(new Date().getFullYear() !== 2025) && new Date().getFullYear()} JTech Works & Co</p>
			</div>
		</footer>
	);
}

export default Footer;