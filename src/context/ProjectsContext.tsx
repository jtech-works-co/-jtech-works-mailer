import React, { createContext, useContext, useEffect, useState } from "react";
import { ProjectType } from "../types/ProjectType";
import { useAuthContext } from "./AuthContext";
import { onValue, push, ref, remove, set } from "firebase/database";
import { dbRef } from "../config/firebaseConfig";

export type ProjectsContextType = {
	projects: ProjectType[];
	isLoading: boolean;
	addProject: (projectName: string) => Promise<void>;
	searchProject: (query: string) => ProjectType[];
	deleteProjectByID: (projectID: string)=> Promise<void>;
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

	const isNameAlreadyUsed = (name: string) => {
		const matched = projects.filter((project) => {
			return project.name.toLowerCase().trim() === name.toLowerCase().trim();
		});

		return matched.length>0;
	};	

	const addProject = async (projectName: string): Promise<void> => {
		if (isNameAlreadyUsed(projectName)) {
			throw new Error('Project Name is already used!');
		}

		if (!currentUser) return;

		const newAPI = generateNewAPIKey();

		// Create a reference to the user's projects path
		const projectsRef = ref(dbRef, `projects/${currentUser.uid}`);

		// Push generates a unique key
		const newProjectRef = push(projectsRef);

		// Create project object
		const newProject = {
			name: projectName,
			apiKey: newAPI,
			createdAt: Date.now(),
			logs: [] // default empty logs
		};

		// Set the data at the new reference
		try {
			await set(newProjectRef, newProject);
		} catch (error) {
			throw error;
		}
	};

	const searchProject = (query: string): ProjectType[] => {
		let filtered = projects;

		filtered = filtered.filter((project) => {
			return project.name.toLowerCase().includes(query.toLowerCase());
		});

		return filtered;
	}

	const deleteProjectByID = async (projectID: string):Promise<void> => {
		if (!currentUser) return;
		// Create a reference to the user's projects path
		const projectRef = ref(dbRef, `projects/${currentUser.uid}/${projectID}`);

		try {
			await remove(projectRef);
		} catch (error) {
			throw error;
		}
	}

	const value: ProjectsContextType = {
		projects,
		isLoading,
		addProject,
		searchProject,
		deleteProjectByID
	};

	return (
		<ProjectsContext value={value}>
			{children}
		</ProjectsContext>
	);
}

export default ProjectsContextProvider;