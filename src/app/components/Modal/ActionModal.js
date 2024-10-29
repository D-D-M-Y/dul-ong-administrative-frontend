// Modal/ActionModal.js
import React, { useState, useEffect } from 'react';
import "./Modal.css";
import Button from '@mui/material/Button';
import {
    CiTrash,
    CiEdit,
} from "react-icons/ci";
import { RiCloseCircleFill } from "react-icons/ri";

export default function Modal({ onToggle, selectedEntity, modalType, fields }) {
  const [formData, setFormData] = useState(selectedEntity);

  useEffect(() => {
      setFormData(selectedEntity); // Update form data when selectedEntity changes
  }, [selectedEntity]);

  const toggleModal = () => {
      onToggle && onToggle(false); // Call the callback if provided
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

    const handleDelete = () => {
        // Implement delete functionality here (e.g., call an API)
        console.log("Item deleted!");
        toggleModal();
    };

    const handleEdit = () => {
        // Implement edit functionality here (e.g., call an API)
        console.log("Updated entity:", formData);
        toggleModal();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalType === "edit") {
            handleEdit();
        } else if (modalType === "delete") {
            handleDelete();
        }
    };

    const handleOpenModal = (type) => {
        setModalType(type);
        setModal(true);
        if (type === "edit") {
            setFormData(selectedEntity); // Populate form with selected entity data
        }
    };

    return (
        <>
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <h2 className='font-roboto font-bold text-[36px] text-center flex flex-col justify-center items-center'>
                            {modalType === "delete" ? "Delete" : "Edit Item"} {/* Dynamic heading */}
                        </h2>
                        {modalType === "delete" ? (
                            <p className='font-source-sans-pro text-[24px] mt-4 mb-4'>Are you sure you want to delete this item?</p>
                        ) : (
                          <form onSubmit={handleSubmit} className={`grid ${fields.length > 5 ? 'grid-cols-2 gap-4' : 'grid-cols-1 gap-2'}`}>
                          {fields.map((field) => (
                              <div className="flex flex-col" key={field.name}>
                                  <label className="font-source_sans_pro">{field.label}:</label>
                                  {field.type === "dropdown" ? (
                                      <select
                                          name={field.name}
                                          value={formData[field.name]}
                                          onChange={handleChange}
                                          className="p-2 border rounded font-ptsans"
                                      >
                                          {field.options.map((option) => (
                                              <option key={option} value={option}>
                                                  {option}
                                              </option>
                                          ))}
                                      </select>
                                  ) : (
                                      <input
                                          type={field.type}
                                          name={field.name}
                                          value={formData[field.name]}
                                          onChange={handleChange}
                                          className="p-2 border rounded font-ptsans"
                                      />
                                  )}
                              </div>
                          ))}
                      </form>
                        )}
                        <div className="modal-actions flex justify-center space-x-4 pt-4"> {/* Container for buttons */}
                        <Button className="cancel-modal" onClick={toggleModal}>
                                <p className="font-source-sans-pro font-bold">Cancel</p>
                            </Button>
                            {modalType === "delete" ? (
                                <Button className="delete-modal" onClick={handleDelete}>
                                    <p className="font-source-sans-pro font-bold">Delete</p>
                                </Button>
                            ) : (
                                <Button className="edit-modal" onClick={handleEdit}>
                                    <p className="font-source-sans-pro font-bold">Save</p>
                                </Button>
                            )}
                        </div>
                        <button className="close-modal" onClick={toggleModal}>
                            <RiCloseCircleFill size={25} />
                        </button>
                    </div>
                </div>
        </>
    );
}