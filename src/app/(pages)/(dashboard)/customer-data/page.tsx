"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import { 
  CiCircleChevDown,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';


interface Entity {
  customerID: string
  name: string;
  city: string;
  barangay: string;
  staddress: string;
  zip: number;
  longitude: number;
  latitude: number;
  timeWindow: string;
}

const entities: Entity[] = [
  // Populate entity data here
  { 
  customerID: "CUS0000001", 
  name: "John Celiz", 
  city: "Iloilo City", 
  barangay: "So-oc", 
  staddress: "12", 
  zip: 5000,
  longitude: 122.517291, 
  latitude: 10.687027,
  timeWindow: "NA",
  },
{ 
  customerID: "CUS0000002", 
  name: "Belle Mirasol", 
  city: "Iloilo City", 
  barangay: "Quezon", 
  staddress: "8", 
  zip: 5000,
  longitude: 122.517291, 
  latitude: 10.687027,
  timeWindow: "NA",
}  
  // ... more entities
];

const MyGrid = () => {
  const handleModalToggle = (isOpen: boolean) => {
    // Perform any actions needed when modal opens/closes (optional)
    console.log("Modal is", isOpen ? "Open" : "Closed");
  };
  const headers = [
    { name: 'Customer ID' },
    { name: 'Name' },
    { name: 'City/Municipality' },
    { name: 'Barangay' },
    { name: 'Street No.' },
    { name: 'Zip' },
    { name: 'Longitude' },
    { name: 'Latitude' },
    { name: 'Time Window' },
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
            <td>{entity.zip}</td>
            <td>{entity.longitude}</td>
            <td>{entity.latitude}</td>
            <td>{entity.timeWindow}</td>
            <td><Modal onToggle={handleModalToggle} /></td>
          </tr>
        ))}
      </tbody>
    </table>
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
