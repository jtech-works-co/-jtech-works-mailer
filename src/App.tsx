import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { lazy, Suspense } from 'react';

const Loading = lazy(() => import('./pages/Loading'))
const Auth = lazy(() => import('./pages/Auth'))
const SignUp = lazy(() => import('./pages/SignUp'))
const SignIn = lazy(() => import('./pages/SignIn'))
const Home = lazy(() => import('./pages/Home'))
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'))
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
						<Route path="/get-started" element={<Home />} />
						<Route path="/about-us" element={<Home />} />
					</Route>

					<Route path='/mailer' element={<ProtectedRoute />}>
						<Route index element={<Home />} /> {/* <Home/> is placeholder render for now */}
					</Route>

					{/* Auth Routes (for both states) */}
					<Route path="/auth" element={<Auth />}>
						<Route path="sign-up" element={<SignUp />} />
						<Route path="sign-in" element={<SignIn />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
