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
import SearchBar from '../ui/tables/searchbar';



interface Entity {
  name: string;
  email: string;
  username: string;
  dateAdded: Date;
  lastLogin: Date;
  actions: JSX.Element[];
}

const entities: Entity[] = [
  // Populate entity data here
{ name: "Angel Jude Diones", 
  email: "angeljude.diones@lsprovder.com.ph", 
  username: "ajdiones", 
  dateAdded: new Date(), 
  lastLogin: new Date(), 
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
  ],
} , 
{ name: "Allana Yzabelle Diaz", 
  email: "allanayzabelle.diaz@lsprovider.com.ph", 
  username: "aydiaz", 
  dateAdded: new Date(), 
  lastLogin: new Date(), 
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
  ],
},
];

const MyGrid = () => {
  /*
  const [sortState, setSortState] = useState<'idle' | 'ascending' | 'descending'>({
    name: 'idle',
    email: 'idle',
    username: 'idle',
    dateAdded: 'idle',
    lastLogin: 'idle',
  }); 
  */

    const headers = [
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Username' },
    { name: 'Date Added' },
    { name: 'Last Login' },
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
          <tr key={entity.email}>
            <td>{entity.name}</td>
            <td>{entity.email}</td>
            <td>{entity.username}</td>
            <td>{entity.dateAdded.toLocaleDateString()}</td>
            <td>{entity.lastLogin.toLocaleDateString()}</td>
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
          Company Settings
        </h1>

        {/* Folder */}
        <div className="flex items-baseline"> 
          <div className="customborder-active">
            <h2>Manage Admins</h2>
          </div>
          <div className="customborder-link">
            <Link href="/company-settings/manage-foos">
              <h2>Manage FOOs</h2>
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
