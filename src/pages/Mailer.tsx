import React, { useState } from "react";
import SearchQuery from "../components/ui/SearchQuery";
import BottomSheet from "@jtech-works/bottom-sheet";
import Textfield from "../components/ui/Textfield";
import { useProjectsContext } from "../context/ProjectsContext";
import { ProjectType } from "../types/ProjectType";

const Mailer: React.FC = () => {
	const { isLoading, projects } = useProjectsContext();
	const [isAddBottomSheetOpen, setIsAddBottomSheetOpen] = useState<boolean>(false);

	return (
		<div className="mailer">
			<header className="header">
				<h1 className="site-title">JTech Mailer</h1>
				<div className="profile"><i className="fas fa-user"></i></div>
			</header>

			<div className="content">
				<div className="actions">
					<SearchQuery />
					<button onClick={() => setIsAddBottomSheetOpen(true)} className="add"><i className="fas fa-add"></i></button>
				</div>

				<div className={`projects ${isLoading && 'skeleton'}`}>
					{isLoading ? (
						Array.from({ length: 20 }).map((_, index) => (
							<div className="card skeleton" key={index}></div>
						))
					) : (
						projects.map((project: ProjectType, index) => (
							<div className="card" key={index}>
								<h1 className="name">{project.name}</h1>
								<div className="info">
									<h3 className="created-at">{project.createdAt}</h3>
									<h3>{project.logs?.length ?? 0}</h3>
								</div>
							</div>
						))
					)}
				</div>
			</div>

			<BottomSheet hasBackDrop isOpen={isAddBottomSheetOpen} onClose={() => setIsAddBottomSheetOpen(false)}>
				<div className="new-project-bottom-sheet">
					<form>
						<Textfield className='textfield' />
						<Textfield className='textfield' />
					</form>
				</div>
			</BottomSheet>
		</div>
	);
}

export default Mailer;