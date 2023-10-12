import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type {
	IEditStatusPayload,
	IRemoveTaskPayload,
	ITaskInitialState,
} from './task.types';
import type { ITask } from '@/types/task.types';

const initialState: ITaskInitialState = {
	tasks: [],
};

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		// TODO: maybe we should choose by title
		addTask: (state, action: PayloadAction<ITask>) => {
			const isExist = state.tasks.some(
				(s_task) => s_task.id === action.payload.id
			);
			if (!isExist)
				state.tasks.push({
					...action.payload,
				});
		},
		editTask: (state, action: PayloadAction<ITask>) => {
			const taskIndex = state.tasks.findIndex(
				(task) => task.id === action.payload.id
			);
			state.tasks = [
				...state.tasks.slice(0, taskIndex),
				action.payload,
				...state.tasks.slice(taskIndex + 1),
			];
		},
		editStatus: (state, action: PayloadAction<IEditStatusPayload>) => {
			const taskIndex = state.tasks.findIndex(
				(task) => task.id === action.payload.id
			);
			state.tasks[taskIndex].status = action.payload.status;
		},
		removeTask: (state, action: PayloadAction<IRemoveTaskPayload>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
		},
	},
});
