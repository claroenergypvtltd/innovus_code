import React from 'react';
import { Modal } from 'react-bootstrap';

export function ModalData(props){
return(
      
<Modal show={props.show} onHide={props.onHide} size="lg" backdrop={false}> 
{!props.noForm && props.ModalTitle && <Modal.Header className="modal-header"> 
 <h4 className="p-widget-title">{props.ModalTitle}</h4>
</Modal.Header> }
{props.noForm && props.ModalTitle && <Modal.Header className="modal-header" closeButton> {/* noForm => not a form  */}
 <h4 className="p-widget-title">{props.ModalTitle}</h4>
</Modal.Header> }
 
<Modal.Body dialogClassName="custom-model" closeButton>
{props.modalData}
</Modal.Body>
</Modal>
                  
)
}