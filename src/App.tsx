import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useAuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Mailer from './pages/Mailer';

function App() {
	const { loading: isCurrentUserLoading, currentUser } = useAuthContext();

	if (isCurrentUserLoading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<BrowserRouter>
			<Routes>
				{/* Authenticated User Routes */}
				{currentUser ? (
					<>
						<Route path="/" element={<Mailer />} />
					</>
				) : (
					<Route path="/" element={<Landing />} >
						<Route index element={<Home />} />
						<Route path="/get-started" element={<Home />} />
						<Route path="/about-us" element={<Home />} />
					</Route>
				)}

				{/* Auth Routes (for both states) */}
				<Route path="/auth" element={<Auth />}>
					<Route path="sign-up" element={<SignUp />} />
					<Route path="sign-in" element={<SignIn />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
