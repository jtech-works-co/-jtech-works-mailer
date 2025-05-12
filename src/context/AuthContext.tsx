import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

export type AuthContextType = {
	currentUser: User | null;
	loading: boolean;
	register: (email: string, password: string) => Promise<User>;
	login: (email: string, password: string) => Promise<User>;
	googleLogin: () => Promise<User>;
	logout: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuthContext must be inside of AuthContextProvider");
	return context;
}

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return () => {
			unsubscribe();
		}
	}, []);

	const register = async (email: string, password: string): Promise<User> => {
		const user = await createUserWithEmailAndPassword(auth, email, password);
		return user.user;

	}

	const login = async (email: string, password: string): Promise<User> => {
		const user = await signInWithEmailAndPassword(auth, email, password);
		return user.user;
	}

	const googleLogin = async (): Promise<User> => {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		return user.user;
	}

	const logout = async (): Promise<boolean> => {
		try {
			await signOut(auth);
			return true;
		} catch (e: any) {
			return false;
		}
	}

	const value: AuthContextType = {
		currentUser,
		loading,
		register,
		login,
		googleLogin,
		logout,
	};

	return (
		<AuthContext value={value}>
			{children}
		</AuthContext>
	);
}

export default AuthContextProvider;