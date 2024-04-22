"use client";
import React, { useState } from 'react';
import { Popup } from '../../ui/dashboard/popup';
import Link from 'next/link';

interface Entity {
  packageID: string
  dimension: string;
  weight: number;
  costs: number;
  transactionID: string;
  paymentMethod: string;
  amount: number;
  date: Date;
  type: string;
  customerID: string;
  routeID: string;
  editIcon: string;
  deleteIcon: string;
}

const entities: Entity[] = [
  // Populate entity data here
  {
    packageID: "PAC0000001",
    dimension: "20 x 15 x 10",
    weight: 1,
    costs: 100,
    transactionID: "TRA0000001",
    paymentMethod: "COD",
    amount: 140,
    date: new Date(),
    type: "Successful",
    customerID: "CUS0000001",
    routeID: "ROU0000001",
    editIcon: "/icons/edit.svg",
    deleteIcon: "/icons/trash.svg"
  }
  // ... more entities
];

const MyGrid = () => {
  // state variable to control popup visibility, initialized to false
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Package ID</th>
            <th>Dimensions</th>
            <th>Weight</th>
            <th>Costs</th>
            <th>Transaction ID</th>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Customer ID</th>
            <th>Route ID</th>
            <th>Edit</th>
            <th>Delete</th>
            {/* Add table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <tr key={entity.packageID}>
              <td>{entity.packageID}</td>
              <td>{entity.dimension}</td>
              <td>{entity.weight}</td>
              <td>{entity.costs}</td>
              <td>{entity.transactionID}</td>
              <td>{entity.packageID}</td>
              <td>{entity.amount}</td>
              <td>{entity.date.toLocaleDateString()}</td>
              <td>{entity.type}</td>
              <td>{entity.customerID}</td>
              <td>{entity.routeID}</td>
              <td className="icon-cell">
                {entity.editIcon && (
                  <img src={entity.editIcon} alt="Edit" width="20" height="20" />
                )}
              </td>
              <td>
                {entity.deleteIcon && (
                  //  added onClick handler for delete icon
                  <img src={entity.deleteIcon} alt="Delete" width="20" height="20" onClick={() => setIsPopupOpen(true)} />)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* added check to render popup if open */}
      {isPopupOpen && <Popup togglePopup={() => setIsPopupOpen(false)} />}
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
            <div className="grid table">
              <MyGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
