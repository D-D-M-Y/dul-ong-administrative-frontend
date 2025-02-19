'use client';

import {
  CiCircleChevUp,
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";

import React, { useState } from 'react';

import Modal from '@/app/components/Modal/ActionModal.js';

import Button from '@mui/material/Button';

const fields = [
    { label: "Name", name: "customerName", type: "text" },
    { label: "Province", name: "province", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "Barangay", name: "barangay", type: "text" },
    { label: "Street No.", name: "streetAddress", type: "text" },
    { label: "Zip", name: "zip", type: "number" },
    { label: "Longitude", name: "longitude", type: "number" },
    { label: "Latitude", name: "latitude", type: "number" },
    { label: "Start of Time Window", name: "time_window_start", type: "number" },
    { label: "End of Time Window", name: "time_window_end", type: "number" },
  ];
  
const CustomerGrid = ({ entities }: { entities: CustomerEntity[]}) => {
const [selectedEntity, setSelectedEntity] = useState<CustomerEntity | null>(null);
const [endpoint, setEndpoint] = useState<"customer_data/edit" | "customer_data/delete" | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
const [sortBy, setSortBy] = useState<keyof CustomerEntity | null>(null);
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

const sortedEntities = entities.sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
    });

const handleSort = (column: keyof CustomerEntity) => {
    if (sortBy === column) {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
    setSortBy(column);
    setSortOrder('asc');
    }
};

const handleModalToggle = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
};

const openModal = (entity: CustomerEntity, type: "edit" | "delete", endpoint: "customer_data/edit" | "customer_data/delete") => {
    setSelectedEntity(entity);
    setEndpoint(`${endpoint}`);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
};

const headers = [
    { name: 'Customer ID', key: 'pk' as keyof CustomerEntity },
    { name: 'Name', key: 'name' as keyof CustomerEntity },
    { name: 'Province', key: 'province' as keyof CustomerEntity },
    { name: 'City/Municipality', key: 'city' as keyof CustomerEntity },
    { name: 'Barangay', key: 'barangay' as keyof CustomerEntity },
    { name: 'Street Address', key: 'street_address' as keyof CustomerEntity },
    { name: 'Longitude', key: 'longitude' as keyof CustomerEntity },
    { name: 'Latitude', key: 'latitude' as keyof CustomerEntity },
    { name: 'Start of Time Window', key: 'time_window_start' as keyof CustomerEntity },
    { name: 'End of Time Window', key: 'time_window_end' as keyof CustomerEntity },
    { name: 'Zip', key: 'zip' as keyof CustomerEntity },
    { name: 'Actions', key: null },
];

return (
    <>
    <table>
        <thead className="font-source_sans_pro">
        <tr>
            {headers.map((header) => (
            <th className="p-4" key={header.name}>
                {header.name}
                {header.key && (
                <button className='ml-1' onClick={() => handleSort(header.key!)}>
                    {sortBy === header.key ? (
                    sortOrder === 'asc' ? <CiCircleChevDown /> : <CiCircleChevUp />
                    ) : (
                    <CiCircleChevDown />
                    )}
                </button>
                )}
            </th>
            ))}
        </tr>
        </thead>

        <tbody className="font-ptsans">
        {sortedEntities.map((entity) => (
            <tr key={entity.pk}>
            <td className='p-4'>{entity.pk}</td>
            <td className='p-4'>{entity.name}</td>
            <td className='p-4'>{entity.province}</td>
            <td className='p-4'>{entity.city}</td>
            <td className='p-4'>{entity.barangay}</td>
            <td className='p-4'>{entity.street_address}</td>
            <td className='p-4'>{entity.longitude}</td>
            <td className='p-4'>{entity.latitude}</td>
            <td className='p-4'>{entity.time_window_start}</td>
            <td className='p-4'>{entity.time_window_end}</td>
            <td className='p-4'>{entity.zip_code}</td>
            <td> <Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "customer_data/edit")}><div className="button-content">
                <CiEdit size={24} />
            </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "customer_data/delete")}><div className="button-content">
                <CiTrash size={24} />
                </div></Button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    {isModalOpen && selectedEntity && (
        <Modal
        onToggle={handleModalToggle}
        endpoint={endpoint}
        selectedEntity={selectedEntity}
        modalType={modalType}
        fields={fields}
        />
    )}
    </>
);
};

export default CustomerGrid;