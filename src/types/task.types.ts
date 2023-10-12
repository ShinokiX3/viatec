// TODO: perhaps, status filed should named like "done" true \ false

export type TTaskFilter = 'all' | 'done' | 'undone';

export interface ITask {
	id: string;
	title: string;
	description: string;
	status: boolean;
	date: string;
}
