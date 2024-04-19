"use client";
import React, { useState } from 'react';
import { Popup } from '../ui/dashboard/popup';
import Link from 'next/link';

interface Entity {
  name: string;
  email: string;
  username: string;
  dateAdded: Date;
  lastLogin: Date;
  editIcon: string;
  deleteIcon: string;
}

const entities: Entity[] = [
  // Populate entity data here
  {
    name: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    dateAdded: new Date(),
    lastLogin: new Date(),
    editIcon: "/icons/edit.svg",
    deleteIcon: "/icons/trash.svg"
  },
  {
    name: "Jonas Doe",
    email: "Jonas.doe@example.com",
    username: "jonasdoe",
    dateAdded: new Date(),
    lastLogin: new Date(),
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
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Date Added</th>
            <th>Last Login</th>
            <th>Edit</th>
            <th>Delete</th>
            {/* Add table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <tr key={entity.email}>
              <td>{entity.name}</td>
              <td>{entity.email}</td>
              <td>{entity.username}</td>
              <td>{entity.dateAdded.toLocaleDateString()}</td>
              <td>{entity.lastLogin.toLocaleDateString()}</td>
              <td className="icon-cell">
                {entity.editIcon && (
                  //  added onClick handler for delete icon
                  <img src={entity.editIcon} alt="Delete" width="20" height="20" />
                )}
              </td>
              <td  >
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
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline">
          <div className="customborder-active">
            <h2 className="pl-5 pr-5">Manage Admins</h2>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/manage-foos" className="pl-2 pr-5">
              <h2>Manage FOOs</h2>
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
