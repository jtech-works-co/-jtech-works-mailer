import React, { createContext, useContext, useEffect, useState } from "react";
import { ProjectType } from "../types/ProjectType";
import { useAuthContext } from "./AuthContext";
import { onValue, ref } from "firebase/database";
import { dbRef } from "../config/firebaseConfig";

export type ProjectsContextType = {
	projects: ProjectType[];
	isLoading: boolean;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const useProjectsContext = () => {
	const context = useContext(ProjectsContext);
	if (!context) throw new Error("useProjectsContext must be inside of ProjectsContextProvider");
	return context;
}

const ProjectsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { currentUser } = useAuthContext();
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!currentUser) return;

		const projectsRef = ref(dbRef, `projects/${currentUser.uid}`);
		const unsubscribe = onValue(projectsRef, (snapshot) => {
			const data = snapshot.val();
			if (!data) {
				setProjects([]);
				setIsLoading(false);

				return;
			}

			const loadedProjects: ProjectType[] = Object.entries(data).map(([id, value]: [string, any]) => ({
				id,
				name: value.name,
				apiKey: value.apiKey,
				createdAt: value.createdAt,
				logs: value.logs || []
			}));

			setProjects(loadedProjects);
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, [currentUser]);

	const generateNewAPIKey = () => {
		const length = 15;
		const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let apiKey = '';

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			apiKey += charset[randomIndex];
		}

		return apiKey;
	};	

	const addProject = async (projectName: string) => {
		const newAPI = generateNewAPIKey();
		
	}

	const value: ProjectsContextType = {
		projects,
		isLoading
	};

	return (
		<ProjectsContext value={value}>
			{children}
		</ProjectsContext>
	);
}

export default ProjectsContextProvider;