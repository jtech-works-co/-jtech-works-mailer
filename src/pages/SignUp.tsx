import * as React from "react";
import Button from "../components/ui/Button";
import Textfield from "../components/ui/Textfield";
import { toast } from "sonner";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { SocialLogin } from "../components/cta/SocialLogin";

const SignUp: React.FC = () => {
	const { register } = useAuthContext();
	const navigate = useNavigate();

	const handleSignUp = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		// Get Data
		const email = String(formData.get("email")).trim();
		const password = String(formData.get("password")).trim();
		const confirmPassword = String(formData.get("confirm-password")).trim();

		if (password !== confirmPassword) {
			toast.error("");
			return;
		}

		toast.promise(
			register(email, password),
			{
				loading: "Creating Account...",
				success: () => {
					navigate(-1);
					return 'Registered Successfully!';
				},
				error: (error) => {
					if (error instanceof FirebaseError) {
						switch (error.code) {
							default:
								return error.code;
						}
					}
					return error.message;
				}
			}
		);
	}

	return (
		<form className="auth-form" onSubmit={handleSignUp}>
			<h1 className="title">Create Account</h1>

			<SocialLogin />

			{/* Form fields */}
			<Textfield
				label="Email"
				name="email"
				type="email"
				placeholder="Enter your Email"
			/>

			<Textfield
				label="Password"
				name="password"
				type="password"
				placeholder="Create a Password"
			/>

			<Textfield
				label="Confirm Password"
				name="confirm-password"
				type="password"
				placeholder="Re-enter Password"
			/>

			{/* Submit */}
			<div className="actions">
				<Button
					variant="primary"
					type="submit"
					text="Sign Up"
					width="100%"
				/>
				<Button variant="tertiary" height="30px" to="../sign-in" replace>
					Already have account? <span className="link">Log In</span>
				</Button>
			</div>
		</form>
	);
};

export default SignUp;
