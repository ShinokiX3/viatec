import { useState } from 'react';
import { Accordion, Form as BForm } from 'react-bootstrap';
import type { ITask } from '@/types/task.types';
import { i_delete, edit } from '@assets/icons';
import { useActions } from '@/hooks/useActions';

import Modal from '../modal/modal';
import Form from '../form/form';
import TaskForm from '../form/task';
import { validateForm } from '@/utils/validateForm';

interface ITaskItem {
	task: ITask;
}

const TaskItem: React.FC<ITaskItem> = ({ task }) => {
	const [shouldShow, setShouldShow] = useState<boolean>(false);
	const [animate, setAnimate] = useState<boolean>(false);

	const [formData, setFormData] = useState<ITask>({ ...task });
	const [formErrors, setFormErrors] = useState<{ title: string }>({
		title: '',
	});

	const { editTask, editStatus, removeTask } = useActions();
	const { title, description } = task;

	const handleSubmit = () => {
		const errors = validateForm(formData);
		if (Object.values(errors).join('').length === 0) {
			editTask({ ...formData });
			setShouldShow(false);
		} else setFormErrors(errors);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;

		setFormData({
			...formData,
			[name]: value === 'on' ? checked : value,
		});
	};

	const handleRemove = () => {
		setAnimate(true);
		setTimeout(() => removeTask({ id: task.id }), 1000);
	};

	return (
		<>
			<Accordion.Item
				className={`task-show ${animate ? 'hidden' : ''}`}
				eventKey="0"
			>
				<Accordion.Header className="task-header">
					<p
						style={{
							fontSize: '18px',
							fontWeight: '500',
							textDecoration: task.status ? 'line-through' : 'initial',
						}}
					>
						{title}
					</p>
					<p className="task-date">{task.date}</p>
					<div className="controls" onClick={(e) => e.stopPropagation()}>
						<BForm.Check
							type="switch"
							id="custom-switch"
							style={{ display: 'flex', alignItems: 'center' }}
							checked={Boolean(task.status)}
							onChange={(e) =>
								editStatus({ id: task.id, status: e.target.checked })
							}
						/>
						<div
							className="control-item"
							onClick={() => {
								setShouldShow(true);
								setFormData(task);
							}}
						>
							<img src={edit} alt={'edit icon'} />
						</div>
						<div className="control-item" onClick={handleRemove}>
							<img src={i_delete} alt={'delete icon'} />
						</div>
					</div>
				</Accordion.Header>
				<Accordion.Body>{description}</Accordion.Body>
			</Accordion.Item>

			{shouldShow ? (
				<Modal title="Edit task" status={shouldShow} handleShow={setShouldShow}>
					<Form handleSubmit={handleSubmit}>
						<TaskForm
							formData={formData}
							formErrors={formErrors}
							handleChange={handleChange}
						/>
					</Form>
				</Modal>
			) : null}
		</>
	);
};

export default TaskItem;
