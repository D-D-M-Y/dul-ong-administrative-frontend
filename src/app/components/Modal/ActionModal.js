import React, { useState, useEffect } from 'react';
import "./Modal.css";
import Button from '@mui/material/Button';
import { RiCloseCircleFill } from "react-icons/ri";
import dynamic from "next/dynamic";

const DynamicMapComponent = dynamic(() => import("@/app/components/Maps/NewPackageMap"), { ssr: false });


const mapApiToFormData = (data) => ({
    ...data,
    customerName: data.name || data.customerName,
    streetAddress: data.street_address || data.streetAddress,
    zip: data.zip_code || data.zip,
    packageName: data.name || data.packageNameName,
    packageSize: data.size || data.packageSize,
    paymentAmount: data.cost || data.paymentAmount
});

const mapFormDataToApi = (data) => ({
    ...data,
    name: data.customerName,
    street_address: data.streetAddress,
    zip_code: data.zip,
    name: data.packageName,
    zip_code: data.zip,
    cost: data.paymentAmount
});

export default function Modal({ onToggle, selectedEntity, modalType, fields, endpoint }) {
    const [markerCoords, setMarkerCoords] = useState(null);

    const [formData, setFormData] = useState(mapApiToFormData(selectedEntity || {}));
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setFormData(mapApiToFormData(selectedEntity || {})); // Update form data when selectedEntity changes
        if (
            markerCoords &&
            (formData.latitude !== markerCoords[0] ||
                formData.longitude !== markerCoords[1])
        ) {
            setFormData((prev) => ({
                ...prev,
                latitude: markerCoords[0],
                longitude: markerCoords[1],
            }));
        }

    }, [selectedEntity, markerCoords]);

    const toggleModal = () => {
        onToggle && onToggle(false); // Call the callback if provided
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form fields
    const validateForm = () => {
        let error = {};
        if (!formData) error = '*Required field*';
        setErrors(errors);

        const isValid = Object.keys(errors).length === 0;
        setSubmitted(true);
        return isValid;
    };

    // Reusable submit action for editing/adding different entities
    const handleEdit = async (endpoint, method = 'PATCH') => {
        if (!validateForm()) {
            alert('The form has blank fields. Please complete the form before submitting.');
            return;
        }

        try {
            const payload = mapFormDataToApi(formData);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}/${selectedEntity.pk}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
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
                alert('Failed to submit entity. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    const handleDelete = async (endpoint, method = 'DELETE') => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}/${selectedEntity.pk}`, {
                method,
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
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="overlay fixed inset-0" onClick={toggleModal}></div>
            <div className="modal-content inline-flex flex-col items-center p-8 bg-white rounded-lg shadow-lg max-w-screen-lg w-full">
                {/* Modal Header */}
                <h2 className="text-2xl font-bold text-center mb-4">
                    {modalType === "delete" ? "Delete" : "Edit Entry"}
                </h2>

                {/* Modal Body */}
                {modalType === "delete" ? (
                    <p className="text-lg mb-4">Are you sure you want to delete this item?</p>
                ) : (
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                            {fields.map((field) => (
                                <div className="flex flex-col" key={field.name}>
                                    <label>{field.label}:</label>
                                    {field.type === "dropdown" ? (
                                        <select name={field.name} value={formData[field.name] || ''} onChange={handleChange} className="p-2 border rounded">
                                            {field.options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={
                                                field.name === "latitude" && markerCoords ? markerCoords[0] :
                                                    field.name === "longitude" && markerCoords ? markerCoords[1] :
                                                        formData[field.name] || ''
                                            }
                                            onChange={handleChange}
                                            className="p-2 border rounded"
                                        />
                                    )}
                                </div>
                            ))}
                        </form>
                        {endpoint === "customer_data/edit" && (
                            <div className="flex-shrink w-full md:w-[300px] lg:w-[350px]">
                            <DynamicMapComponent width="100%" height="450px" onMarkerChange={(coords) => setMarkerCoords(coords)} />
                        </div>
                        )}
                        
                    </div>
                )}

                {/* Modal Actions */}
                <div className="modal-actions flex justify-center space-x-4 pt-4">
                    <Button className="cancel-modal" onClick={toggleModal}>Cancel</Button>
                    {modalType === "delete" ? (
                        <Button className="delete-modal" onClick={() => handleDelete(endpoint)}>Delete</Button>
                    ) : (
                        <Button className="edit-modal" onClick={() => handleEdit(endpoint)}>Save</Button>
                    )}
                </div>

                <button className="close-modal absolute top-4 right-4" onClick={toggleModal}>
                    <RiCloseCircleFill size={25} />
                </button>
            </div>
        </div>


    );
}
