import { ProjectLogs } from "./ProjectLogs";

export type ProjectType = {
	id: string;
	name: string;
	apiKey: string;
	createdAt: number;
	sentMail?: number;
	logs?: ProjectLogs[];
}