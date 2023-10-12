import { Form } from 'react-bootstrap';
import type { ITask } from '@/types/task.types';

interface ITaskForm {
	formData: ITask;
	formErrors: { title: string };
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskForm: React.FC<ITaskForm> = ({
	formData,
	formErrors,
	handleChange,
}) => {
	return (
		<>
			<Form.Group className="mb-3" controlId="formTaskTitle">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					name="title"
					placeholder="Enter task's title"
					value={formData.title}
					onChange={handleChange}
					isInvalid={!!formErrors.title}
				/>
				<Form.Control.Feedback type="invalid">
					{formErrors.title}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formTaskDescription">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					name="description"
					placeholder="Describe your task..."
					style={{ height: '100px' }}
					value={formData.description}
					onChange={handleChange}
				/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formTaskStatus">
				<Form.Check
					type="switch"
					id="custom-switch"
					label="Done"
					name="status"
					checked={formData.status}
					onChange={handleChange}
				/>
			</Form.Group>
		</>
	);
};

export default TaskForm;
