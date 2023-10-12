import { Form as BForm, Button, Stack } from 'react-bootstrap';

interface IForm {
	children: React.ReactNode;
	handleSubmit: () => void;
}

const Form: React.FC<IForm> = ({ handleSubmit, children }) => {
	return (
		<BForm
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			{children}
			<Stack gap={1}>
				<Button variant="outline-dark" type="submit">
					Submit
				</Button>
			</Stack>
		</BForm>
	);
};

export default Form;
