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
  customerID: string
  name: string;
  city: string;
  barangay: string;
  staddress: string;
  longitude: number;
  latitude: number;
  waitingCost: number;
}

const entities: Entity[] = [
  // Populate entity data here
  { 
  customerID: "CUS0000001", 
  name: "John Celiz", 
  city: "Iloilo City", 
  barangay: "So-oc", 
  staddress: "12", 
  longitude: 122.517291, 
  latitude: 10.687027,
  waitingCost: 0.0,
  },
{ 
  customerID: "CUS0000002", 
  name: "Belle Mirasol", 
  city: "Iloilo City", 
  barangay: "Quezon", 
  staddress: "8", 
  longitude: 122.517291, 
  latitude: 10.687027,
  waitingCost: 0.0,
}  
  // ... more entities
];

const fields = [
  { label: "Name", name: "name", type: "text" },
  { label: "City", name: "city", type: "text" },
  { label: "Barangay", name: "barangay", type: "text" },
  { label: "Street No.", name: "staddress", type: "text" },
  { label: "Longitude", name: "longitude", type: "number" },
  { label: "Latitude", name: "latitude", type: "number" },
  { label: "Waiting Cost", name: "waitingCost", type: "number" },
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
    { name: 'Customer ID' },
    { name: 'Name' },
    { name: 'City' },
    { name: 'Barangay' },
    { name: 'Street No.' },
    { name: 'Longitude' },
    { name: 'Latitude' },
    { name: 'Waiting Cost' },
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
          <tr key={entity.customerID}>
            <td>{entity.customerID}</td>
            <td>{entity.name}</td>
            <td>{entity.city}</td>
            <td>{entity.barangay}</td>
            <td>{entity.staddress}</td>
            <td>{entity.longitude}</td>
            <td>{entity.latitude}</td>
            <td>{entity.waitingCost}</td>
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
        <h1 className='font-roboto font-bold'>
          Customer Data
        </h1>

        {/* Folder */}
        <div className="flex items-baseline font-source_sans_pro"> 
          <div className="customborder-active">
            <h2>Manage Customers</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
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
          <SearchBar/>
          <div className="grid table">
            <MyGrid />
            </div>
            </div>
          </div>
        </div>
      </div>
  );
}
