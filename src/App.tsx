import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import React, { lazy, Suspense } from 'react';

const ProtectedRoute = lazy(() => import('./pages/helper/ProtectedRoute'))
const PreventRelogin = lazy(() => import('./pages/helper/PreventRelogin'));
const Loading = lazy(() => import('./pages/helper/Loading'))
const SignUp = lazy(() => import('./pages/SignUp'))
const SignIn = lazy(() => import('./pages/SignIn'))
const Home = lazy(() => import('./pages/Home'))
const Landing = lazy(() => import('./pages/Landing'))

function App() {
	const { loading: isCurrentUserLoading } = useAuthContext();

	if (isCurrentUserLoading) {
		return <Loading />
	}

	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<Landing />} >
						<Route index element={<Home />} />
						<Route path="/get-started" element={<h1>Get Started</h1>} />
						<Route path="/about-us" element={<h1>About Us</h1>} />
					</Route>

					<Route path='/mailer' element={<ProtectedRoute />}>
						<Route index element={<Home />} />
					</Route>

					{/* Auth Routes (for both states) */}
					<Route path="/auth" element={<PreventRelogin />}>
						<Route path="sign-up" element={<SignUp />} />
						<Route path="sign-in" element={<SignIn />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
