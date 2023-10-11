import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { ITaskInitialState } from './task.types';
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
			if (!isExist) state.tasks.push({ ...action.payload });
		},
	},
});
