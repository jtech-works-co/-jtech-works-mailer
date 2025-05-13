import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.min.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import { Toaster } from 'sonner';
import '@jtech-works/bottom-sheet/dist/index.css';
import ProjectsContextProvider from './context/ProjectsContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Toaster />
		<AuthContextProvider>
			<ProjectsContextProvider>
				<App />
			</ProjectsContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);