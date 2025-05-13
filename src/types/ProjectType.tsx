import { ProjectLogs } from "./ProjectLogs";

export type ProjectType = {
	id: string;
	name: string;
	apiKey: string;
	createdAt: number;
	logs?: ProjectLogs[];
}