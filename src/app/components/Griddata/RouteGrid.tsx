'use client';

import {
  CiCircleChevUp,
  CiCircleChevDown
} from "react-icons/ci";

import React, { useState } from 'react';

const RouteGrid = ({ entities }: { entities: RouteEntity[] }) => {
    const [sortBy, setSortBy] = useState<keyof RouteEntity | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
    const sortedEntities = entities.sort((a, b) => {
      if (!sortBy) return 0;
      const aValue = a[sortBy];
      const bValue = b[sortBy];
  
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    const handleSort = (column: keyof RouteEntity) => {
      if (sortBy === column) {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortBy(column);
        setSortOrder('asc');
      }
    };
  
    const headers = [
      { name: 'Route ID', key: 'pk' as keyof RouteEntity },
      { name: 'Payment Date', key: 'route_date' as keyof RouteEntity },
      { name: 'Cargo Quantity', key: 'cargo_quantity' as keyof RouteEntity },
      { name: 'Transportation Cost', key: 'transportation_cost' as keyof RouteEntity },
      { name: 'Carrying Capacity', key: 'total_weight' as keyof RouteEntity },
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
                <td className='p-4'>{entity.route_date}</td>
                <td className='p-4'>{entity.cargo_quantity}</td>
                <td className='p-4'>{entity.transportation_cost}</td>
                <td className='p-4'>{entity.total_weight}</td>
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

export default RouteGrid;