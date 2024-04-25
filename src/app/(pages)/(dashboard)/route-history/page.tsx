import React, { useState } from 'react';
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
  routeID: string
  date: Date;
  route: string;
  cargoQuantity: number;
  transportationCost: string;
  vehicleID: string;
  gas: number;
  carryingCapacity: number;
  actions: JSX.Element[];  //trash button only
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
  actions: [
  <Button variant="outlined" color="error" className ="square-button">
    <div className="button-content">  
    <CiTrash size ={24}/>
  </div>
</Button>
  ],}
  // ... more entities
];

const MyGrid = () => {
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
          <tr key={entity.routeID}>
            <td>{entity.routeID}</td>
            <td>{entity.date.toLocaleDateString()}</td>
            <td>{entity.route}</td>
            <td>{entity.cargoQuantity}</td>
            <td>{entity.transportationCost}</td>
            <td>{entity.vehicleID}</td>
            <td>{entity.gas}</td>
            <td>{entity.carryingCapacity}</td>
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
          Route History
        </h1>

        {/* Folder */}
        <div className="customborder-active">
          <h2>Manage Routes</h2>
        </div>

        {/* Body */}
        <div className="customborder-body">
          <div className='p-5'>
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
