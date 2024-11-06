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
  pk: number
  name: string;
  size: number;
  cost: string;
  amount: number;
  date: Date;
  type: string;
  customerID: string;
  routeID: string;
  payment_method: string;
  status: string;
}

const entities: Entity[] = [];

async function fetchEntities() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/packages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entities: ${response.statusText}`);
    }
    const data = await response.json();
    entities.push(...data);
  } catch (error) {
    console.error('Error fetching entities:', error);
  }
}

fetchEntities().then(() => {
  console.log(entities);
});

const fields = [
  { label: "Dimensions", name: "dimensions", type: "text" },
  { label: "Weight", name: "weight", type: "number" },
  { label: "Costs", name: "costs", type: "number" },
  { label: "Payment Method No.", name: "paymentMethod", type: "text" },
  { label: "Amount", name: "amount", type: "number" },
  { label: "Date", name: "date", type: "date" },
  { label: "Type", name: "type", type: "text" },
  { label: "Preferred Delivery", name: "Preferred Delivery", type: "dropdown", options: ["Priority Shipping", "Economy Shipping"] },
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
    { name: 'Package ID' },
    { name: 'Name' },
    { name: 'Size' },
    { name: 'Costs' },
    { name: 'Amount' },
    { name: 'Date' },
    { name: 'Type' },
    { name: 'Customer ID' },
    { name: 'Route ID' },
    { name: 'Status' },
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
    <thead className="font-source_sans_pro">
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
            <button className='ml-1'> <CiCircleChevDown/></button>)}
          </th>
        ))}
      </tr>
    </thead>
      <tbody className="font-ptsans" >
        {entities.map((entity) => (
          <tr key={entity.pk}>
            <td>{entity.pk}</td>
            <td>{entity.name}</td>
            <td>{entity.size}</td>
            <td>{entity.cost}</td>
            <td>{entity.amount}</td>
            <td>{entity.date.toLocaleDateString()}</td>
            <td>{entity.type}</td>
            <td>{entity.customerID}</td>
            <td>{entity.routeID}</td>
            <td>{entity.payment_method}</td>
            <td>{entity.status}</td>
            <td><Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit")}><div className="button-content">
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
          </Link>
          </div>
          <div className="customborder-active">
              <h2>Manage Packages</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/view-transactions">
              <h2>View Transactions</h2>
            </Link>
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
             {/*<SearchBar />*/}
            <div className="grid table">
              <MyGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
