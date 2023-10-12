import './app.css';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
	Container,
	Row,
	Col,
	Accordion,
	Button,
	Stack,
	ListGroup,
	Form as BForm,
} from 'react-bootstrap';

import type { ITask } from '@/types/task.types';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { getLocaleDate, validateForm } from '@/utils';
import { Modal, Form, TaskForm, TaskItem } from '@/components';

const initialFormData = {
	id: '',
	title: '',
	description: '',
	date: getLocaleDate(new Date()),
	status: false,
};

const App = () => {
	const [shouldShow, setShouldShow] = useState<boolean>(false);
	const [formData, setFormData] = useState<ITask>({ ...initialFormData });

	const [formErrors, setFormErrors] = useState<{ title: string }>({
		title: '',
	});
	// TODO: could use URL approach instead state to store filter type
	const [filterSelect, setFilterSelect] = useState<string>('all');

	const tasks = useTypedSelector((state) => state.task.tasks);
	const { addTask } = useActions();

	const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);

	useEffect(() => {
		if (filterSelect === 'all') setFilteredTasks(tasks);
		if (filterSelect === 'done')
			setFilteredTasks(tasks.filter((task) => task.status === true));
		if (filterSelect === 'undone')
			setFilteredTasks(tasks.filter((task) => task.status === false));
	}, [filterSelect, tasks]);

	const handleSubmit = () => {
		const errors = validateForm(formData);
		if (Object.values(errors).join('').length === 0) {
			addTask({
				...formData,
				date: getLocaleDate(new Date()),
				id: uuid(),
			});
			setShouldShow(false);
			setFormData({ ...initialFormData });
		} else setFormErrors(errors);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target;

		setFormData({
			...formData,
			[name]: value === 'on' ? checked : value,
		});
	};

	return (
		<>
			<Container className="mt-5">
				<Stack gap={3}>
					<Row className="justify-content-md-center">
						<Col className="text-center" lg={{ span: 7, offset: 0 }}>
							<Row className="mb-2">
								<Col>
									<h2>Task list</h2>
								</Col>
								<Col>
									<BForm.Select
										aria-label="Filter by status"
										onChange={(e) => setFilterSelect(e.target.value)}
									>
										<option value="all">All</option>
										<option value="done">Done</option>
										<option value="undone">Undone</option>
									</BForm.Select>
								</Col>
							</Row>
							{filteredTasks.length < 1 ? (
								<ListGroup>
									<ListGroup.Item>There are not any tasks yet.</ListGroup.Item>
								</ListGroup>
							) : (
								<ListGroup>
									{filteredTasks.map((task) => (
										<Accordion key={task.id} defaultActiveKey="0">
											<TaskItem task={task} />
										</Accordion>
									))}
								</ListGroup>
							)}
						</Col>
					</Row>
					<Row className="justify-content-md-center">
						<Col
							className="mb-4 d-flex justify-content-end"
							lg={{ span: 7, offset: 0 }}
							md={{ span: 15, offset: 0 }}
						>
							<Button
								variant="outline-dark"
								onClick={() => setShouldShow(true)}
							>
								Add Task
							</Button>
						</Col>
					</Row>
				</Stack>
			</Container>

			<Modal
				title="Add new task"
				status={shouldShow}
				handleShow={setShouldShow}
			>
				<Form handleSubmit={handleSubmit}>
					<TaskForm
						formData={formData}
						formErrors={formErrors}
						handleChange={handleChange}
					/>
				</Form>
			</Modal>
		</>
	);
};

export default App;
