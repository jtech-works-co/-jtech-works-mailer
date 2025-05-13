import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Mailer from "./Mailer";

const ProtectedRoute: React.FC = () => {
	const { currentUser } = useAuthContext();
	return currentUser ? <Mailer /> : <Navigate to='/auth/sign-up' />
}

export default ProtectedRoute;