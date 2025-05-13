import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="auth">
			<div className="nav-back" onClick={() => navigate(-1)}>
				<i className="fas fa-arrow-left"></i>
			</div>
			<Outlet />
		</div>
	);
}

export default Auth;