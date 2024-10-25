"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevDown,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';

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

const MyGrid = () => {
  const handleModalToggle = (isOpen: boolean) => {
    // Perform any actions needed when modal opens/closes (optional)
    console.log("Modal is", isOpen ? "Open" : "Closed");
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
          <tr key={entity.transactionID}>
            <td>{entity.transactionID}</td>
            <td>{entity.paymentMethod}</td>
            <td>{entity.paymentAmount}</td>
            <td>{entity.paymentDate.toLocaleDateString()}</td>
            <td>{entity.status}</td>
            <td>{entity.deliveryID}</td>
            <td>{entity.vehicleID}</td>
            <td>{entity.fooID}</td>
            <td>{entity.routeID}</td>
            <td>{entity.customerID}</td>
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
            <SearchBar />
            <div className="grid table">
              <MyGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}