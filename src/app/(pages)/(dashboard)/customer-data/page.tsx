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
  pk: number;
  name: string;
  province: string;
  city: string;
  barangay: string;
  street_address: string;
  longitude: string;
  latitude: string;
  time_window_start: number;
  time_window_end: number;
  zip: number;
}

const entities: Entity[] = [];

async function fetchEntities() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/customer_data');
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
  { label: "Name", name: "name", type: "text" },
  { label: "City", name: "city", type: "text" },
  { label: "Barangay", name: "barangay", type: "text" },
  { label: "Street No.", name: "staddress", type: "text" },
  { label: "Longitude", name: "longitude", type: "number" },
  { label: "Latitude", name: "latitude", type: "number" },
  { label: "Start of Time Window", name: "time_window_start", type: "number" },
  { label: "End of Time Window", name: "time_window_end", type: "number" },
  { label: "Zip", name: "zip", type: "number" },
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
    { name: 'Province' },
    { name: 'City/Municipality' },
    { name: 'Barangay' },
    { name: 'Street Address' },
    { name: 'Longitude' },
    { name: 'Latitude' },
    { name: 'Start of Time Window' },
    { name: 'End of Time Window' },
    { name: 'Zip' },
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
            <td>{entity.province}</td>
            <td>{entity.city}</td>
            <td>{entity.barangay}</td>
            <td>{entity.street_address}</td>
            <td>{entity.longitude}</td>
            <td>{entity.latitude}</td>
            <td>{entity.time_window_start}</td>
            <td>{entity.time_window_end}</td>
            <td>{entity.zip}</td>
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
        <div className="flex items-baseline"> 
          <div className="customborder-active">
            <h2>Manage Customers</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/manage-packages">
              <h2>Manage Packages</h2>
            </Link>
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
