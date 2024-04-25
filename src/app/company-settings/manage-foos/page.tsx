"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from '../../components/Modal/ActionModal.js';
import {
  CiCircleChevDown,
} from "react-icons/ci";
import SearchBar from '../../ui/tables/searchbar';

interface Entity {
  name: string;
  email: string;
  username: string;
  dateAdded: Date;
  lastLogin: Date;
}

const entities: Entity[] = [
  // Populate entity data here
  {
    name: "Agustine Exmundo",
    email: "agustine.exmundo@lsprovider.com.ph",
    username: "aexmundo",
    dateAdded: new Date(),
    lastLogin: new Date(),
  },
  {
    name: "Adam Chan",
    email: "adam.chan@lsprovider.com.ph",
    username: "achan",
    dateAdded: new Date(),
    lastLogin: new Date(),
  }
  // ... more entities
];

const MyGrid = () => {
  const handleModalToggle = (isOpen: boolean) => {
    // Perform any actions needed when modal opens/closes (optional)
    console.log("Modal is", isOpen ? "Open" : "Closed");
  };

  const headers = [
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Username' },
    { name: 'Date Added' },
    { name: 'Last Login' },
    { name: 'Actions' },
  ];

  return (
    <>
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
                  <button className='ml-1'> <CiCircleChevDown /></button>)}
              </th>
            ))}
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
        <h1 className='font-bold'>
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline">
          <div className="customborder-link">
            <Link href="/company-settings">
              <h2>Manage Admins</h2>
            </Link>
          </div>
          <div className="customborder-active">
            <h2>Manage FOOs</h2>
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
