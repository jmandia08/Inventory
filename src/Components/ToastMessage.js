import React from 'react'
import {Toast } from 'react-bootstrap';

const ToastMessage = ({toggleShow=null,showToast=null}) => {
    return (
        <div className="toast-container">
        <Toast show={showToast} onClose={toggleShow}>
            <Toast.Header>
                <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
                />
                <strong className="mr-auto">Inventory</strong>
                <small id="timer">Just Now</small>
            </Toast.Header>
            <Toast.Body>New Item Added successfully!</Toast.Body>
        </Toast>
    </div>
    )
}

export default ToastMessage
