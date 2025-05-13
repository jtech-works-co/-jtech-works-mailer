import { toast } from "sonner";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SocialLogin: React.FC = () => {
	const navigate = useNavigate();
	const { googleLogin } = useAuthContext();

	const handleLogin = () => {
		toast.promise(
			googleLogin(),
			{
				success: () => {
					navigate('/mailer');
					return 'Log in successfully!'
				},
				error: (error) => {
					if (error.code === 'auth/popup-closed-by-user') {
						return 'Login Cancelled';
					}

					return error.message;
				}
			}
		);
	}

	return (
		<div className="social-login">
			<button type="button" onClick={handleLogin} className="cta"><i className="fab fa-google"></i></button>
			<button type="button" onClick={handleLogin} className="cta"><i className="fab fa-facebook"></i></button>
		</div>
	);
}