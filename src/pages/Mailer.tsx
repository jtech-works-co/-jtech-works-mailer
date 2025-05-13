import React, { useEffect, useState } from "react";
import SearchQuery from "../components/ui/SearchQuery";
import { useProjectsContext } from "../context/ProjectsContext";
import { ProjectType } from "../types/ProjectType";
import formatDate from "../utils/formatDate";
import NewProjectForm from "../components/form/NewProjectForm";
import { toast } from "sonner";
import ProjectCard from "../components/ui/ProjectCard";

const Mailer: React.FC = () => {
	const { isLoading, searchProject } = useProjectsContext();
	const [isAddBottomSheetOpen, setIsAddBottomSheetOpen] = useState<boolean>(false);
	const [filteredProject, setFilteredProjects] = useState<ProjectType[]>([]);
	const [query, setQuery] = useState<string>('');

	useEffect(() => {
		setFilteredProjects(searchProject(query));
	}, [query, searchProject]);

	return (
		<div className="mailer">
			<header className="header">
				<h1 className="site-title">JTech Mailer</h1>
				<div className="profile"><i className="fas fa-user"></i></div>
			</header>

			<div className="content">
				<div className="actions">
					<SearchQuery onInput={(value) => setQuery(value)} />
					<button onClick={() => setIsAddBottomSheetOpen(true)} className="add"><i className="fas fa-add"></i></button>
				</div>

				<div className={'projects'}>
					{
						isLoading ?
							(
								<h1>Loading...</h1>
							)
							:
							filteredProject.length>0 ?
								(
									filteredProject.map((project) => (
										<ProjectCard key={project.id} project={project} />
									))
								)
								: (
									<h1>No Projects Found</h1>
								)
					}
				</div>
			</div>

			<NewProjectForm
				isOpen={isAddBottomSheetOpen}
				onClose={() => setIsAddBottomSheetOpen(false)}
			/>
		</div>
	);
}

export default Mailer;