"use client";
import React, { useState } from 'react';
import { Popup } from '../ui/dashboard/popup';

interface Entity {
  routeID: string
  date: Date;
  route: string;
  cargoQuantity: number;
  transportationCost: string;
  vehicleID: string;
  gas: number;
  carryingCapacity: number;
  editIcon: string;
  deleteIcon: string;
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
            <th>Customer ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Barangay</th>
            <th>Street Address</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Waiting Cost</th>
            <th>Edit</th>
            <th>Delete</th>
            {/* Add table headers if needed */}
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
              <td className="icon-cell">
                {entity.editIcon && (
                  <img src={entity.editIcon} alt="Edit" width="20" height="20" />
                )}
              </td>
              <td className="icon-cell">
                {entity.deleteIcon && (
                  //  added onClick handler for delete icon
                  <img src={entity.deleteIcon} alt="Delete" width="20" height="20" onClick={() => setIsPopupOpen(true)} />
                )}
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
          Route History
        </h1>

        {/* Folder */}
        <div className="customborder-link">
          <h2 className="pl-5 pr-5">Manage Routes</h2>
        </div>

        {/* Body */}
        <div className="customborder-body">
          <div className="grid">
            <MyGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
