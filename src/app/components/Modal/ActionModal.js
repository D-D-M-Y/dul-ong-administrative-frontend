import React, { useState, useEffect } from 'react';
import "./Modal.css";
import Button from '@mui/material/Button';
import { RiCloseCircleFill } from "react-icons/ri";

export default function Modal({ onToggle, selectedEntity, modalType, fields }) {
    const [formData, setFormData] = useState(selectedEntity || {});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setFormData(selectedEntity || {}); // Update form data when selectedEntity changes
    }, [selectedEntity]);

    const toggleModal = () => {
        onToggle && onToggle(false); // Call the callback if provided
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form fields
    const validateForm = () => {
        let errors = {};
        if (!formData.customerName) errors.customerName = 'Name is required.';
        if (!formData.city) errors.city = 'City is required.';
        if (!formData.barangay) errors.barangay = 'Barangay is required.';
        if (!formData.streetAddress) errors.streetAddress = 'Street Address is required.';
        if (!formData.zip) errors.zip = 'ZIP Code is required.';
        if (!formData.latitude) errors.latitude = 'Latitude is required.';
        if (!formData.longitude) errors.longitude = 'Longitude is required.';
        setErrors(errors);

        const isValid = Object.keys(errors).length === 0;
        setSubmitted(true);
        return isValid;
    };

    // Handle the submit action for editing/adding a customer
    const handleEdit = async () => {
        if (!validateForm()) {
            alert('The form has blank fields. Please complete the form before submitting.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/customer_data/edit/${selectedEntity.pk}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                alert('Entity was edited and saved successfully!');
                setErrors({});
                setSubmitted(false);
                toggleModal(); // Close the modal after submission
                window.location.reload();
            } else {
                console.error('Failed to submit form:', await response.text());
                alert('Failed to add customer. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while adding the customer. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/customer_data/delete/${selectedEntity.pk}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            console.log("Item deleted!");
            alert("Entity successfully deleted!");
            
            toggleModal();
            if (onToggle) {
                onToggle(true);
            }
            window.location.reload();
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("There was an error deleting the item.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalType === "edit") {
            handleEdit();
        } else if (modalType === "delete") {
            handleDelete();
        }
    };

    return (
        <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal-content">
                <h2 className="font-roboto font-bold text-[36px] text-center flex flex-col justify-center items-center">
                    {modalType === "delete" ? "Delete" : "Edit Entry"}
                </h2>
                {modalType === "delete" ? (
                    <p className="font-source-sans-pro text-[24px] mt-4 mb-4">Are you sure you want to delete this item?</p>
                ) : (
                    <form onSubmit={handleSubmit} className={`grid ${fields.length > 5 ? 'grid-cols-2 gap-4' : 'grid-cols-1 gap-2'}`}>
                        {fields.map((field) => (
                            <div className="flex flex-col" key={field.name}>
                                <label className="font-source_sans_pro">{field.label}:</label>
                                {field.type === "dropdown" ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name] || ''}
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
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className="p-2 border rounded font-ptsans"
                                    />
                                )}
                                {submitted && errors[field.name] && (
                                    <span className="text-red-500 text-xs">{errors[field.name]}</span>
                                )}
                            </div>
                        ))}
                    </form>
                )}
                <div className="modal-actions flex justify-center space-x-4 pt-4">
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
    );
}
