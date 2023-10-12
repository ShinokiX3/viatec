import type { ITask } from '@/types/task.types';

export interface ITaskInitialState {
	tasks: ITask[];
}

export interface IEditStatusPayload {
	id: string;
	status: boolean;
}

export interface IEditStatusPayload {
	id: string;
	status: boolean;
}

export interface IRemoveTaskPayload {
	id: string;
}
