// src/components/Modal.js
import React from 'react';
import { Button } from "pepsico-ds";
import '../App.css';

function Modal({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <Button
                        type="button"
                        size="large"
                        text="Cancel"
                        onClick={onClose}
                        variant="secondary"
                        className="button"
                    />
                    <Button
                        type="button"
                        size="large"
                        text="OK"
                        onClick={onConfirm}
                        variant="primary"
                        className="button"
                    />
                </div>
            </div>
        </div>
    );
}

export default Modal;
