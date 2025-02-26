'use client';

import {
  CiCircleChevUp,
  CiCircleChevDown,
  CiTrash,
  CiEdit,
} from "react-icons/ci";

import React, { useState } from 'react';

const AdminGrid = ({ entities }: { entities: FooEntity[] }) => {
    const [sortBy, setSortBy] = useState<keyof FooEntity | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
    const sortedEntities = entities.sort((a, b) => {
        if (!sortBy) return 0;
        const aValue = a[sortBy];
        const bValue = b[sortBy];
  
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  
    const handleSort = (column: keyof FooEntity) => {
      if (sortBy === column) {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    };
  
  
    const headers = [
      { name: 'ID', key: 'pk' as keyof FooEntity },
      { name: 'Name', key: 'lname' as keyof FooEntity },
      { name: 'Email', key: 'email' as keyof FooEntity },
      { name: 'Username', key: 'username' as keyof FooEntity },
      { name: 'Date Added', key: 'date_registered' as keyof FooEntity },
      { name: 'Last Login', key: null },
    ];
  
    return (
      <>
        <table>
          <thead className='font-source_sans_pro'>
            <tr>
              {headers.map((header) => (
                <th className="p-4" key={header.name}>
                  {header.name}
                  {header.key && (
                    <button className='ml-1' onClick={() => handleSort(header.key!)}>
                      {sortBy === header.key ? (
                        sortOrder === 'asc' ? <CiCircleChevDown /> : <CiCircleChevUp />
                      ) : (
                        <CiCircleChevDown />
                      )}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='font-ptsans'>
            {sortedEntities.map((entity) => (
              <tr key={entity.email}>
                <td className='p-4'>{entity.pk}</td>
                <td className='p-4'>{entity.name}</td>
                <td className='p-4'>{entity.email}</td>
                <td className='p-4'>{entity.username}</td>
                <td className='p-4'>{entity.date_registered}</td>
                <td className='p-4'>{entity.last_login}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

export default AdminGrid;