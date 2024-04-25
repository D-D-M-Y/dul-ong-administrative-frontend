import React, { useState } from "react";
import "./Modal.css";
import Button from '@mui/material/Button';
import {
    CiTrash,
    CiEdit,
    // ... other icons
} from "react-icons/ci";
import { RiCloseCircleFill } from "react-icons/ri";


export default function Modal({ onToggle }) {
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState("delete"); // State to identify modal type
    const [deleteSuccessModal, setDeleteSuccessModal] = useState(false);
    const [editSuccessModal, setEditSuccessModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
        onToggle && onToggle(!modal); // Call the callback if provided
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        toggleModal();
    };

    const handleDelete = () => {
        // Implement delete functionality here (e.g., call an API)
        console.log("Item deleted!");
        setDeleteSuccessModal(true); // Show delete success popup
        toggleModal();
    };

    const handleEdit = () => {
        // Implement edit functionality here (e.g., navigate to edit page)
        console.log("Item edited!");
        setEditSuccessModal(true); // Show edit success popup
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
                        <h2 className='font-roboto font-bold text-[36px]'>
                            {modalType === "delete" ? "Delete" : "Edit Item"} {/* Dynamic heading */}
                        </h2>
                        <p>
                            {modalType === "delete" ? (
                                <p className='font-source-sans-pro text-[24px] mt-4 mb-4'>Are you sure you want to delete this item?</p>
                            ) : (
                                <p className='font-source-sans-pro text-[24px] mt-4 mb-4'>
                                    Do you wish to edit this item?
                                </p>
                            )}
                        </p>
                        <div className="modal-actions"> {/* Container for buttons */}
                            {modalType === "delete" ? (
                                <>
                                    <Button className="cancel-modal" onClick={toggleModal}>
                                        <p className="font-source-sans-pro font-bold">Cancel</p>
                                    </Button>
                                    <Button className="delete-modal" onClick={handleDelete}>
                                        <p className="font-source-sans-pro font-bold">Delete</p>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button className="cancel-modal" onClick={toggleModal}>
                                        <p className="font-source-sans-pro font-bold">Cancel</p>
                                    </Button>
                                    <Button className="edit-modal" onClick={handleEdit}>
                                        <p className="font-source-sans-pro font-bold">Edit</p>
                                    </Button>
                                </>
                            )}
                        </div>
                        <button className="close-modal" onClick={toggleModal}>
                            <RiCloseCircleFill size={25} />
                        </button>
                    </div>
                </div>
            )}
            {deleteSuccessModal && (
                <div className="modal">  {/* Add a class for styling */}
                    <div onClick={() => setDeleteSuccessModal(false)} className="overlay"></div>
                    <div className="modal-content">
                        <h2 className="font-roboto font-bold font-[36px]">Item Deleted Successfully</h2> {/* Success message */}
                        <button className="close-modal" onClick={() => setDeleteSuccessModal(false)}>
                            <RiCloseCircleFill size={25} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
