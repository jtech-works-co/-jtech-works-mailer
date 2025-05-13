import * as React from "react";
import { ProjectType } from "../../types/ProjectType";
import formatDate from "../../utils/formatDate";
import { toast } from "sonner";
import { useProjectsContext } from "../../context/ProjectsContext";
import { confirmAlert } from "react-confirm-alert";

type ProjectCardProps = {
	project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
	project
}) => {
	const { deleteProjectByID } = useProjectsContext();

	const handleDelete = () => {
		confirmAlert({
			title: "Confirm to Submit",
			message: "Are you sure you want to delete?",
			overlayClassName: "confirm-dialog-custom-overlay",
			buttons: [
				{
					label: "Cancel",
					onClick: () => { },
				},
				{
					label: 'Delete',
					onClick: () => {
						toast.promise(
							deleteProjectByID(project.id),
							{
								loading: "Deleting Project...",
								success: "Project Deleted Successfully!",
								error: (error) => {
									return error.message;
								}
							}
						);
					}
				},
			]
		});

	}

	return (
		<div className="project-card">
			<div className="header">
				<h2 className="name">{project.name}</h2>
				<button className="delete" onClick={handleDelete}>
					<i className="fas fa-trash-can"></i>
				</button>
			</div>
			<div className="info">
				<h3 className="created-at">{formatDate(project.createdAt)}</h3>
				<h3 className="logs">{project.logs?.length ?? 0}</h3>
			</div>
		</div>
	);
}

export default ProjectCard;