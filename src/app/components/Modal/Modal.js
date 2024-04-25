import React, { useState } from "react";
import "./Modal.css";
import Button from '@mui/material/Button';
import {
    CiTrash,
    CiEdit,
    // ... other icons
} from "react-icons/ci";

export default function Modal({ onToggle }) {
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState("delete"); // State to identify modal type

    const toggleModal = () => {
        setModal(!modal);
        onToggle && onToggle(!modal); // Call the callback if provided
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        toggleModal();
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => handleOpenModal("edit")}>
                <div className="button-content">
                    <CiEdit size={24} />
                </div>
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleOpenModal("delete")}>
                <div className="button-content">
                    <CiTrash size={24} />
                </div>
            </Button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>
                            {modalType === "delete" ? "Delete Confirmation" : "Edit Item"} {/* Dynamic heading */}
                        </h2>
                        <p>
                            {modalType === "delete" ? (
                                <p>
                                    {/* Edit form or content specific to edit functionality */}
                                </p>
                            ) :
                                (
                                    <p>Are you sure you want to delete this item?</p>
                                )
                            }
                        </p>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
