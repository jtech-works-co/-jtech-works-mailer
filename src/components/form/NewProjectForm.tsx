import * as React from "react";
import Textfield from "../ui/Textfield";
import BottomSheet from "@jtech-works/bottom-sheet";
import { useProjectsContext } from "../../context/ProjectsContext";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

type NewProjectFormProps = {
	isOpen: boolean;
	onClose: () => void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({
	isOpen = false,
	onClose
}) => {
	const { addProject } = useProjectsContext();
	const [projectName, setProjectName] = React.useState<string>('');

	const handleOnClose = () => {
		setTimeout(() => {
			setProjectName("");
		}, 100);
		onClose();
	}

	const handleOnSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		toast.promise(
			addProject(projectName),
			{
				loading: "Generating new API Key...",
				success: () => {
					handleOnClose();
					return 'Project Created Successfully!';
				},
				error: (error) => {
					if (error instanceof FirebaseError) {
						return error.code;
					}
					return error.message;
				}
			}
		);
	}

	return (
		<BottomSheet hasBackDrop isOpen={isOpen} onClose={handleOnClose}>
			<div className="new-project-bottom-sheet">
				<form onSubmit={handleOnSubmit}>
					<label htmlFor="project-name">Project Name</label>
					<input type="text" placeholder="Enter Project Name" value={projectName} onInput={(e) => setProjectName((e.target as HTMLInputElement).value)} />
					<div className="actions-container">
						<button type="submit">Create</button>
					</div>
				</form>
			</div>
		</BottomSheet>
	);
}

export default NewProjectForm;