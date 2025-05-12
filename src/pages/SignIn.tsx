import * as React from "react";
import Textfield from "../components/ui/Textfield";
import Button from "../components/ui/Button";

const SignIn: React.FC = () => {
	return (
		<form className="auth-form">
			<h1 className="title">Log In</h1>

			{/* Email and Password */}
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
				placeholder="Enter your Password"
			/>

			<div className="actions">
				<Button variant="tertiary" height="30px">
					<span className="link">Forgot Password?</span>
				</Button>
			</div>

			{/* Submit */}
			<div className="actions">
				<Button
					variant="primary"
					type="submit"
					text="Sign In"
					width="100%"
				/>
			</div>

			{/* Separator */}
			<div className="or" />

			{/* Login with Socials */}
			<div className="actions">
				<Button
					variant="secondary"
					text="Continue with Google"
					width="100%"
				/>
			</div>

			{/* Sign Up Link */}
			<div className="actions">
				<Button variant="tertiary" height="30px" to="../sign-up" replace>
					Don't have account? <span className="link">Sign Up</span>
				</Button>
			</div>
		</form>
	);
}

export default SignIn;