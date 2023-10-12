import { Modal as BModal } from 'react-bootstrap';

interface IModal {
	status: boolean;
	handleShow: (status: boolean) => void;
	title?: string;
	children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({
	status,
	handleShow,
	title = 'Modal header',
	children,
}) => {
	return (
		<BModal show={status} onHide={() => handleShow(false)}>
			<BModal.Header closeButton>
				<BModal.Title>{title}</BModal.Title>
			</BModal.Header>
			<BModal.Body>{children}</BModal.Body>
		</BModal>
	);
};

export default Modal;
