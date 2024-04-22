"use client";
import React, { useState } from 'react';
import { Popup } from '../ui/dashboard/popup';
import Link from 'next/link';
import { 
  CiTrash,
  CiEdit,
  CiCircleChevDown,
  CiCircleChevUp 
} from "react-icons/ci";
import Button from '@mui/material/Button';
import SearchBar from '@/app/ui/tables/searchbar';


interface Entity {
  customerID: string
  name: string;
  city: string;
  barangay: string;
  staddress: string;
  longitude: number;
  latitude: number;
  waitingCost: number;
  actions: JSX.Element[];
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
  actions: [
    <Button variant="outlined" color="primary" > 
      <div className="button-content">
        <CiEdit size ={24} />
      </div>
    </Button>,
    <Button variant="outlined" color="error">
      <div className="button-content">
      <CiTrash size ={24}/>
    </div>
  </Button>
  ],},
{ 
  customerID: "CUS0000002", 
  name: "Belle Mirasol", 
  city: "Iloilo City", 
  barangay: "Quezon", 
  staddress: "8", 
  longitude: 122.517291, 
  latitude: 10.687027,
  waitingCost: 0.0,
  actions: [
    <Button variant="outlined" color="primary" > 
      <div className="button-content">
        <CiEdit size ={24} />
      </div>
    </Button>,
    <Button variant="outlined" color="error">
      <div className="button-content">
      <CiTrash size ={24}/>
    </div>
  </Button>
  ],}  
  // ... more entities
];

const MyGrid = () => {
    // state variable to control popup visibility, initialized to false
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    <table>
      <thead>
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

      <tbody>
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
            <td>{entity.actions?.map((action, index) => (
              <span key={index}>{action}</span>))}
            </td>
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
        <h1 className='font-bold'>
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
