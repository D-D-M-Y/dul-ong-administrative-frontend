"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from '@/app/components/Modal/ActionModal.js';
import {
  CiCircleChevDown,
} from "react-icons/ci";
import SearchBar from '@/app/ui/tables/searchbar';

interface Entity {
  pk: number
  name: string;
  size: number;
  cost: string;
  amount: number;
  payment_method: string;
  status: string;
  customerid: string;
}

const MyGrid = ({ entities, searchQuery }: { entities: Entity[], searchQuery: string }) => {
  const filteredEntities = entities.filter(entity =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headers = [
    { name: 'Package ID' },
    { name: 'Name' },
    { name: 'Size' },
    { name: 'Costs' },
    { name: 'Amount' },
    { name: 'Payment Method' },
    { name: 'Status' },
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
      <thead className="font-source_sans_pro">
        <tr>
          {headers.map((header) => (
            <th className="p-4" key={header.name}>
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
      <tbody className="font-ptsans" >
        {filteredEntities.map((entity) => (
          <tr key={entity.pk}>
            <td className='p-4'>{entity.pk}</td>
            <td className='p-4'>{entity.name}</td>
            <td className='p-4'>{entity.size}</td>
            <td className='p-4'>{entity.cost}</td>
            <td className='p-4'>{entity.amount}</td>
            <td className='p-4'>{entity.payment_method}</td>
            <td className='p-4'>{entity.status}</td>
            <td className='p-4'>{entity.customerid}</td>
            <td className='p-4'><Modal onToggle={() => { }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Page() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/packages');
        if (!response.ok) {
          throw new Error(`Failed to fetch entities: ${response.statusText}`);
        }
        const data = await response.json();
        setEntities(data); // Set the entities state
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntities();
  }, []);
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
            </Link>
          </div>
          <div className="customborder-active">
            <h2>Manage Packages</h2>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/view-transactions">
              <h2>View Transactions</h2>
            </Link>
          </div>
          <div className="customborder-link">
            <Link href="/customer-data/new-package">
              <h2>New Package</h2>
            </Link>
          </div>
        </div>


        {/* Body */}
        <div className="customborder-body p-5 overflow-auto max-h-[1080px] max-w-[1920px]">
          <SearchBar query={searchQuery} setQuery={setSearchQuery} />
          <div className="grid table w-full overflow-auto p-4 max-h-[600px]">
            <MyGrid entities={entities} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
