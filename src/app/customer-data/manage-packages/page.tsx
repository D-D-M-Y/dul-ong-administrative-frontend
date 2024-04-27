"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from '../../components/Modal/ActionModal.js';
import {
  CiCircleChevDown,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';

interface Entity {
  packageID: string
  dimensions: string;
  weight: number;
  costs: number;
  transactionID: string;
  paymentMethod: string;
  amount: number;
  date: Date;
  type: string;
  customerID: string;
  routeID: string;
}

const entities: Entity[] = [
  // Populate entity data here
  {
    packageID: "PAC0000001",
    dimensions: "20 x 15 x 10",
    weight: 1,
    costs: 100,
    transactionID: "TRA0000001",
    paymentMethod: "COD",
    amount: 140,
    date: new Date(),
    type: "Successful",
    customerID: "CUS0000001",
    routeID: "ROU0000001",
  }
  // ... more entities
];

const MyGrid = () => {
  const handleModalToggle = (isOpen: boolean) => {
    // Perform any actions needed when modal opens/closes (optional)
    console.log("Modal is", isOpen ? "Open" : "Closed");
  };
  const headers = [
    { name: 'Package ID' },
    { name: 'Dimensions' },
    { name: 'Weight' },
    { name: 'Costs' },
    { name: 'Transaction ID' },
    { name: 'Payment Method' },
    { name: 'Amount' },
    { name: 'Date' },
    { name: 'Type' },
    { name: 'Customer ID' },
    { name: 'Route ID' },
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
    <><table>
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
                <button className='ml-1'> <CiCircleChevDown /></button>)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <tr key={entity.packageID}>
            <td>{entity.packageID}</td>
            <td>{entity.dimensions}</td>
            <td>{entity.weight}</td>
            <td>{entity.costs}</td>
            <td>{entity.transactionID}</td>
            <td>{entity.packageID}</td>
            <td>{entity.amount}</td>
            <td>{entity.date.toLocaleDateString()}</td>
            <td>{entity.type}</td>
            <td>{entity.customerID}</td>
            <td>{entity.routeID}</td>
            <td><Modal onToggle={handleModalToggle} /></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div>
        <h1 style={{ fontWeight: 'bold' }}>
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
