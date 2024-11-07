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
  transactionID: string;
  paymentMethod: string;
  paymentAmount: number;
  paymentDate: Date;
  status: string;
  deliveryID: string;
  vehicleID: string;
  fooID: string;
  routeID: string;
  customerID: string;
}

const entities: Entity[] = [
  // Populate entity data here
  {
    transactionID: "TRA0000001",
    paymentMethod: "PAID",
    paymentAmount: 140,
    paymentDate: new Date(),
    status: "Successful",
    deliveryID: "DEL0000001",
    vehicleID: "VEH0000001",
    fooID: "FOO0000001",
    routeID: "ROU0000001",
    customerID: "CUS0000001",
  }
  // ... more entities
];

const fields = [
  { label: "Payment Method", name: "paymentMethod", type: "text" },
  { label: "Payment Amount", name: "paymentAmount", type: "number" },
  { label: "Payment Date", name: "paymentDate", type: "date" }, // Use type "date" for date input
  { label: "Status", name: "status", type: "text" },
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
    { name: 'Transaction ID' },
    { name: 'Payment Method' },
    { name: 'Payment Amount' },
    { name: 'Payment Date' },
    { name: 'Status' },
    { name: 'Delivery ID' },
    { name: 'Vehicle ID' },
    { name: 'FOO ID' },
    { name: 'Route ID' },
    { name: 'Customer ID' },
    { name: 'Actions' },
  ];
  /*const handleSortClick = (headerName: string) => {
    setSortState((prevState: 'idle' | 'ascending' | 'descending') => {
      const newState = Object.fromEntries(
        Object.entries(prevState).map(([key, value]) => (key === headerName ? [key, value === 'idle' ? 'ascending' : value === 'ascending' ? 'descending' : 'idle'] : [key, 'idle']))
      ) as 'idle' | 'ascending' | 'descending';
      return newState;
    });
  };} */



   return (
    <>
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th className='p-4' key={header.name}>
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
      <tbody>
        {entities.map((entity) => (
          <tr key={entity.transactionID}>
            <td className='p-4'>{entity.transactionID}</td>
            <td className='p-4'>{entity.paymentMethod}</td>
            <td className='p-4'>{entity.paymentAmount}</td>
            <td className='p-4'>{entity.paymentDate.toLocaleDateString()}</td>
            <td className='p-4'>{entity.status}</td>
            <td className='p-4'>{entity.deliveryID}</td>
            <td className='p-4'>{entity.vehicleID}</td>
            <td className='p-4'>{entity.fooID}</td>
            <td className='p-4'>{entity.routeID}</td>
            <td className='p-4'>{entity.customerID}</td>
            <td className='p-4'><Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit")}><div className="button-content">
                    <CiEdit size={24} />
                </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete")}><div className="button-content">
                  <CiTrash size={24} />
                </div></Button></td>
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
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className='font-bold'>
          Customer Data
        </h1>

        {/* Folder */}
        <div className="flex items-baseline">
          <div className="customborder-link">
            <Link href="/customer-data">
              <h2>Manage Customers</h2>
            </Link>          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <h2>View Transactions</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/new-package">
              <h2>New Package</h2>
            </Link>
          </div>
        </div>


        {/* Body */}
        <div className="customborder-body">
          <div className="p-5">
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            <div className="grid table">
              <MyGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
