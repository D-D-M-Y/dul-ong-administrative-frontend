"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevDown,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';

interface Entity {
  pk: number;
  fname: string;
  mname: string;
  lname: string;
  name: string;
  email: string;
  username: string;
  date_registered: string;
  last_login: string;
}

function generateName(entity: Entity): string {
  return entity.fname + ' ' + entity.mname + ' ' + entity.lname;
}

const entities: Entity[] = [];

async function fetchEntities() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users/admin');
    if (!response.ok) {
      throw new Error(`Failed to fetch entities: ${response.statusText}`);
    }
    const data = await response.json();
    data.forEach((entity: Entity) => {
      entity.name = generateName(entity);
    });
    entities.push(...data);
  } catch (error) {
    console.error('Error fetching entities:', error);
  }
}

fetchEntities().then(() => {
  console.log(entities);
});

const MyGrid = () => {
  const handleModalToggle = (isOpen: boolean) => {
    console.log("Modal is", isOpen ? "Open" : "Closed");
  };

  const headers = [
    { name: 'ID' },
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
        <thead className='font-source_sans_pro'>
          <tr>
            {headers.map((header) => (
              <th key={header.name}>
                {header.name}
                {header.name !== 'Actions' && (
                  <button className='ml-1'> <CiCircleChevDown /></button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='font-ptsans'>
          {entities.map((entity) => (
            <tr key={entity.email}>
              <td>{entity.pk}</td>
              <td>{entity.name}</td>
              <td>{entity.email}</td>
              <td>{entity.username}</td>
              <td>{entity.date_registered}</td>
              <td>{entity.last_login}</td>
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
        <h1 className='font-bold font-roboto'>
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline font-source_sans_pro">
          <div className="customborder-active ">
            <h2>Manage Admins</h2>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/manage-foos">
              <h2>Manage FOOs</h2>
            </Link>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/add-vehicle">
              <h2>Add Vehicle</h2>
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

