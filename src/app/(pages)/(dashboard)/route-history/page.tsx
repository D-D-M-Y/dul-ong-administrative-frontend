"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';
import Button from '@mui/material/Button';


interface Entity {
  routeID: string
  date: Date;
  route: string;
  cargoQuantity: number;
  transportationCost: string;
  vehicleID: string;
  gas: number;
  carryingCapacity: number;
}

const entities: Entity[] = [
  // Populate entity data here
  {
    routeID: "CUS000001",
    date: new Date(),
    route: "Iloilo City",
    cargoQuantity: 1000,
    transportationCost: "8",
    vehicleID: "VEH000001",
    gas: 50,
    carryingCapacity: 1000,
  }  // ... more entities
];

const fields = [
  { label: "Date", name: "date", type: "date" }, // Use type "date" for date input
  { label: "Route", name: "route", type: "text" },
  { label: "Cargo Quantity", name: "cargoQuantity", type: "number" },
  { label: "Transportation Cost", name: "transportationCost", type: "text" }, // Keeping as text for currency
  { label: "Gas", name: "gas", type: "number" },
  { label: "Carrying Capacity", name: "carryingCapacity", type: "number" },
];

const MyGrid = () => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null); 

  const handleModalToggle = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const openModal = (entity: Entity, type: "edit" | "delete") => {
    setSelectedEntity(entity);
    setModalType(type); // Set the modal type
    setIsModalOpen(true);
  };

  const headers = [
    { name: 'Route ID' },
    { name: 'Date' },
    { name: 'Route' },
    { name: 'Cargo Quantity' },
    { name: 'Transportation Cost' },
    { name: 'Vehicle ID' },
    { name: 'Gas' },
    { name: 'Carrying Capacity' },
    { name: 'Actions' },
  ];
  return (
    <>
    <table>
      <thead className='font-source_sans_pro'>
        <tr>
          {headers.map((header) => (
            <th key={header.name}>
              {header.name}
              {header.name !== 'Actions' && (
                /* <button type="button" onClick={() => handleSortClick(header.name)}>
                   {sortState[header.name] === 'idle' ? (
                     <CiCircleChevDown />
                   ) : sortState[header.name] === 'ascending' ? (
                     <CiCircleChevUp />
                   ) : (
                     <CiCircleChevDown /> // Descending state (optional icon)
                   )}
                 </button>*/
                <button className='ml-1'> <CiCircleChevDown /></button>)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='font-ptsans'>
        {entities.map((entity) => (
          <tr key={entity.routeID}>
            <td>{entity.routeID}</td>
            <td>{entity.date.toLocaleDateString()}</td>
            <td>{entity.route}</td>
            <td>{entity.cargoQuantity}</td>
            <td>{entity.transportationCost}</td>
            <td>{entity.vehicleID}</td>
            <td>{entity.gas}</td>
            <td>{entity.carryingCapacity}</td>
             <td> <Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit")}><div className="button-content">
                    <CiEdit size={24} />
                </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete")}><div className="button-content">
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
          selectedEntity={selectedEntity}
          modalType={modalType}
          fields = {fields}
        />
      )}
          </>
  );
};

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div>
        <h1 className='font-bold font-roboto'>
          Route History
        </h1>

        {/* Folder */}
        <div className="customborder-active font-source_sans_pro">
          <h2>Manage Routes</h2>
        </div>

        {/* Body */}
        <div className="customborder-body">
          <div className='p-5'>
            {/* <SearchBar /> */}
            <div className="grid table">
              <MyGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
