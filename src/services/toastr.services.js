import React from 'react'
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';


export const toastr = {
    notificationSystem: null,
    setNotificationSystem(n) {
        this.notificationSystem = n;
    },
    success(message = '', title = 'Information') {
        this.notificationSystem.addNotification({
            title: title,
            message: message,
            level: 'success'
        });
    },
    error(message = '', title = 'Information') {
        this.notificationSystem.addNotification({
            title: title,
            message: message,
            level: 'error'
        });
    },
    warning(message = '', title = 'Information') {
        this.notificationSystem.addNotification({
            title: title,
            message: message,
            level: 'info'
        });
    },
    confirm(message, props, title) {
        const options = {
            title: title,
            message: message,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { props.onOk() }
                },
                {
                    label: 'No',
                    onClick: () => { props.onCancel() }
                }
            ]
        }
        confirmAlert(options)
    },
    confirmSubmit(message, props, title) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='delete-popup'>
                        <h4 className="delete-popup-header">{title}</h4>
                        <div className="delete-popup-message">
                            <p>{message}</p>
                            {/* <button className="btn btn-default pull-right mrr10" onClick={()=>{
                        props.onCancel() 
                        onClose()}}>{window.strings.NEXT}</button>
                        <button className="btn btn-primary pull-right mrr10" onClick={() => { props.onOk()
                            onClose()}}>{window.strings.SUBMITBUTTON}</button> */}

                            <button className="btn btn-default mr-2" onClick={() => {
                                props.onCancel()
                                onClose()
                            }}>{window.strings.NEXT}</button>
                            <button className="btn btn-primary" onClick={() => {
                                props.onOk()
                                onClose()
                            }}>{window.strings.SUBMITBUTTON}</button>

                        </div>
                    </div>
                )
            }
        })
    },
    customConfirm(message, props, title) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='delete-popup'>
                        <h4 className="delete-popup-header">{title}</h4>
                        <div className="delete-popup-message p-2">
                            <p>{message}</p>
                            {/* <button className="btn btn-default pull-right mrr10" onClick={()=>{
                        props.onCancel() 
                        onClose()}}><i className="fa fa-close mr15"></i>{window.strings.CANCEL}</button>
                        <button className="btn btn-primary pull-right mrr10" onClick={() => { props.onOk()
                            onClose()}}><i className="fa fa-send-o mr15"></i>{window.strings.OK}</button> */}

                            <button className="btn btn-default popup-cancel mt-3" onClick={() => {
                                props.onCancel()
                                onClose()
                            }}>{window.strings.CANCEL}</button>
                            <button className="btn btn-primary delete-btn ml-2 mt-3" onClick={() => {
                                props.onOk()
                                onClose()
                            }}>{window.strings.OK}</button>
                            {/* <button className="btn btn-default mt-3" onClick={() => {
                                props.onCancel()
                                onClose()
                            }}>{window.strings.CANCEL}</button> */}



                        </div>
                    </div>
                )
            }
        })
    }
};

