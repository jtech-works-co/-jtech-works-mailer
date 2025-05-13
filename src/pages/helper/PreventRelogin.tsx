import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Auth from "../Auth";

const PreventRelogin: React.FC = () => {
	const { currentUser } = useAuthContext();
	return currentUser ? <Navigate replace to='/mailer' /> : <Auth />
}

export default PreventRelogin;