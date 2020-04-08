import React from 'react';
import { Modal } from 'react-bootstrap';

export function ModalData(props) {
    return (

        <Modal show={props.show} onHide={props.onHide} size="" backdrop={false}>
            <Modal.Header className="main-wrapper" closeButton>
                <h4 className="user-title m-0">{props.ModalTitle}</h4>
            </Modal.Header>


            <Modal.Body dialogClassName="custom-model" closeButton>
                {props.modalData}
            </Modal.Body>
        </Modal>

    )
}