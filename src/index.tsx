import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.min.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import { Toaster } from 'sonner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Toaster/>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
  </React.StrictMode>
);