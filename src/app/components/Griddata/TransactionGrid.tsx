'use client';

import {
  CiCircleChevUp,
  CiCircleChevDown
} from "react-icons/ci";

import React, { useState } from 'react';

const TransactionGrid = ({ entities }: { entities: TransactionEntity[] }) => {
    const [sortBy, setSortBy] = useState<keyof TransactionEntity | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
    const sortedEntities = entities.sort((a, b) => {
      if (!sortBy) return 0;
      const aValue = a[sortBy];
      const bValue = b[sortBy];
  
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    const handleSort = (column: keyof TransactionEntity) => {
      if (sortBy === column) {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    };
  
    const headers = [
      { name: 'Transaction ID', key: 'pk' as keyof TransactionEntity },
      { name: 'Payment Method', key: 'payment_method' as keyof TransactionEntity },
      { name: 'Status', key: 'status' as keyof TransactionEntity },
      { name: 'Vehicle ID', key: 'vehicleid' as keyof TransactionEntity },
      { name: 'Route ID', key: 'routeid' as keyof TransactionEntity },
      { name: 'FOO ID', key: 'fooid' as keyof TransactionEntity },
      { name: 'Customer ID', key: 'customerid' as keyof TransactionEntity },
      { name: 'Preferred Delivery', key: 'preferred' as keyof TransactionEntity },
      { name: 'Payment Date', key: 'date' as keyof TransactionEntity },
    ];
  
  
  
    return (
      <>
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th className='p-4' key={header.name}>
                  {header.name}
                  {header.name !== 'Actions' && (
                    <button className='ml-1' onClick={() => handleSort(header.key!)}>
                      {sortBy === header.key ? (
                        sortOrder === 'asc' ? <CiCircleChevDown /> : <CiCircleChevUp />
                      ) : (
                        <CiCircleChevDown />
                      )}
                    </button>
                    // <button className='ml-1'> <CiCircleChevDown /></button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedEntities.map((entity) => (
              <tr key={entity.pk}>
                <td className='p-4'>{entity.pk}</td>
                <td className='p-4'>
                  {entity.payment_method === 'GCA' ? 'GCash' :
                    entity.payment_method === 'CAR' ? 'Card' : 'Cash'}
                </td>              <td className='p-4'>{entity.status}</td>
                <td className='p-4'>{entity.vehicleid}</td>
                <td className='p-4'>{entity.routeid}</td>
                <td className='p-4'>{entity.fooid}</td>
                <td className='p-4'>{entity.customerid}</td>
                <td className='p-4'>{entity.preferred ? "Priority Shipping" : "Economy Shipping"}</td>
                <td className='p-4'>{entity.date}</td>
                {/* <td className='p-4'><Button variant="outlined" color="primary" onClick={() => openModal(entity, "edit", "transactions/edit")}><div className="button-content">
                  <CiEdit size={24} />
                </div></Button>
                  <Button variant="outlined" color="error" onClick={() => openModal(entity, "delete", "transactions/delete")}><div className="button-content">
                    <CiTrash size={24} />
                  </div></Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* {isModalOpen && selectedEntity && (
          <Modal
            onToggle={handleModalToggle}
            endpoint={endpoint}
            selectedEntity={selectedEntity}
            modalType={modalType}
            fields={fields}
          />
        )} */}
      </>
    );
  };

export default TransactionGrid;