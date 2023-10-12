import { ITask } from '@/types/task.types';

export const validateForm = (task: ITask) => {
	const errors = { title: '' };
	if (task.title.length < 1) {
		errors.title = 'Title has to consist at least 1 symbol';
	}
	return errors;
};
