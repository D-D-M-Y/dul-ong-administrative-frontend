// not connected to backend, no sorting function implemented yet

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
  // Static entity (no endpoint exists yet)
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
  // const [endpoint, setEndpoint] = useState<"/edit" | "/delete" | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  // const handleModalToggle = (isOpen: boolean) => {
  //   setIsModalOpen(isOpen);
  // };

  // const openModal = (entity: Entity, type: "edit" | "delete", endpoint: "/edit" | "/delete") => {
  //   setSelectedEntity(entity);
  //   setEndpoint(endpoint);
  //   setModalType(type); // Set the modal type
  //   setIsModalOpen(true);
  // };

  const headers = [
    { name: 'Route ID' },
    { name: 'Date' },
    { name: 'Route' },
    { name: 'Cargo Quantity' },
    { name: 'Transportation Cost' },
    { name: 'Vehicle ID' },
    { name: 'Gas' },
    { name: 'Carrying Capacity' },
    // { name: 'Actions' },
  ];
  return (
    <>
      <table>
        <thead className='font-source_sans_pro'>
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
        <tbody className='font-ptsans'>
          {entities.map((entity) => (
            <tr key={entity.routeID}>
              <td className='p-4'>{entity.routeID}</td>
              <td className='p-4'>{entity.date.toLocaleDateString()}</td>
              <td className='p-4'>{entity.route}</td>
              <td className='p-4'>{entity.cargoQuantity}</td>
              <td className='p-4'>{entity.transportationCost}</td>
              <td className='p-4'>{entity.vehicleID}</td>
              <td className='p-4'>{entity.gas}</td>
              <td className='p-4'>{entity.carryingCapacity}</td>
              {/* <td> <Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "/edit")}><div className="button-content">
                <CiEdit size={24} />
              </div></Button>
                <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "/delete")}><div className="button-content">
                  <CiTrash size={24} />
                </div></Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {isModalOpen && selectedEntity && (
        <Modal
          onToggle={handleModalToggle}
          endpoint={endpoint}
          selectedEntity={selectedEntity}
          modalType={modalType}
          fields={fields}
        />
      )} */}
    </>
  );
};

export default function Page() {
  const [entities, setEntities] = useState<Entity[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  // useEffect(() => {
  //   const fetchEntities = async () => {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/route_history`);
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch entities: ${response.statusText}`);
  //       }
  //       const data = await response.json();
  //       setEntities(data); // Set the entities state
  //     } catch (error) {
  //       console.error('Error fetching entities:', error);
  //     }
  //   };

  //   fetchEntities();
  // }, []);
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
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          {/* <SearchBar query={searchQuery} setQuery={setSearchQuery} /> */}
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <MyGrid />
          </div>
        </div>
      </div>
    </div >
  );
}
