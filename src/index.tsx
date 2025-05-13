import './index.min.css';
import '@jtech-works/bottom-sheet/dist/index.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import { Toaster } from 'sonner';
import ProjectsContextProvider from './context/ProjectsContext';
import DialogContextProvider from '@jtech-works/dialog';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Toaster />
		<DialogContextProvider animation='bounce'>
			<AuthContextProvider>
				<ProjectsContextProvider>
					<App />
				</ProjectsContextProvider>
			</AuthContextProvider>
		</DialogContextProvider>
	</React.StrictMode>
);